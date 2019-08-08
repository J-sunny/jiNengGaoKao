<template>
  <div style="height: 50px;">
    <div class="navbar" :style="'background-color:'+color">
      <div class="sidebar-logo-container collapse">
        <transition name="sidebarLogoFade">
          <router-link class="sidebar-logo-link" to="/">
            <h1 class="sidebar-title">{{ title }} </h1>
          </router-link>
        </transition>
      </div>
      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="$store.state.user.avatar" class="user-avatar">
            <p>{{ $store.state.user.name }}<i class="el-icon-caret-bottom" /></p>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>

              <el-upload
                class="upload-demo"
                action="http://221.234.36.70:18081/jx-project-exam/dbinfo/JXZcontroller/uploadFile"
                :data="datass"
                :headers="headerss"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <span style="display:block;">更换头像</span>
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getText, getInfo, updatePhoto } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {
  components: {
  },
  data() {
    return {
      color: '#2A93FE',
      title: '',
      headerss: {
      },
      datass: {
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created() {
    this.headerss = {
      'X-Token': getToken()
    }
    this.datass = {
      userId: this.$store.state.user.introduction,
      userType: '1'
    }
    getText().then(data => {
      this.Text = JSON.parse(data.data.text)
      this.title = this.Text.title
      if (this.Text.color != '') {
        this.color = this.Text.color
      } else {
        this.color = '#2A93FE'
      }
    })
    // window.addEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleAvatarSuccess(val) {
      var obj = {
        photoName: val.data.msg.split('/')[val.data.msg.split('/').length - 1],
        userId: this.$store.state.user.introduction,
        userType: '1'
      }
      updatePhoto(obj).then(data => {
        getInfo(getToken()).then(data => {
          this.$store.state.user.photoUrl = data.data.photoUrl
        })
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  left: 0;
  z-index: 99999;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        p{
          line-height: 50px;
          display: inline-block;
          font-size: 14px;
          position: relative;
          top: -15px;
          color: #fff;
          i{
            position: relative;
            top: 20px!important;
            left: 42px;
          }
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding-left: 24px;
  float: left;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
