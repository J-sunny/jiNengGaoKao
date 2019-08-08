import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
		 children: [
		  {
		    path: '',
		    component: () => import('@/views/Asy/asy'),
		    name: 'Dashboard'
		    // meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
		  }
    ]

  }
  /** when your routing map is too long, you can split it into small modules **/

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
	   path: '/Asy',
		 component: Layout,
		 children: [
		   {
		     path: 'dashboard',
		     component: () => import('@/views/Asy/asy'),
				 meta: { title: '首页' }
		   }
		 ]
  },
  {
	   path: '/',
		 component: Layout,
		 hidden: true,
		 children: [
		   {
		     path: '/',
		     component: () => import('@/views/Asy/asy'),
				 meta: { title: '首页' }
		   }
		 ]
  },
  {
    path: '/Subject',
    component: Layout,
    alwaysShow: true, // will always show the root menu

    meta: { title: '科目/知识点管理', icon: 'Subject' },
    children: [
      {
        path: '',
        meta: { title: '科目管理' },
        component: () => import('@/views/Subject/Subject')

      },
      {
        path: '/Knowledge',
        meta: { title: '知识点管理' },
        component: () => import('@/views/Subject/Knowledge/index')

      }
    ]
  },
  {
    path: '/ItemBank',
    component: Layout,
    meta: { title: '', icon: 'ItemBank' },
    children: [
      {
        path: '',
        meta: { title: '题库管理' },
        component: () => import('@/views/ItemBank')
      },
      {
        path: 'Entry',
        hidden: true,
        meta: { title: '录入题目' },
        component: () => import('@/views/Entry/index')
      }
    ]
  },
  {
    path: '/testPaper',
    component: Layout,

    meta: { title: '', icon: 'testPaper' },
    children: [
      {
        path: '',
        meta: { title: '试卷库管理' },
        component: () => import('@/views/testPaper/Manual')
      },
      {
        path: '/autoGenerating',
        hidden: true,
        meta: { title: '新建自动组卷' },
        component: () => import('@/views/testPaper/Automatic/autoGenerating/index')
      },
      {
        path: '/newlyBuild',
        hidden: true,
        meta: { title: '新建手动组卷' },
        component: () => import('@/views/testPaper/newlyBuild/index')
      }
    ]
  },
  {
    path: '/management',
    component: Layout,
    alwaysShow: true, // will always show the root menu

    meta: { title: '随堂管理', icon: 'management' },
    children: [
      {
        path: '/material',
        meta: { title: '教材管理' },
        component: () => import('@/views/management/material/index')

      },
      {
        path: '/chapter',
        meta: { title: '章节管理' },
        component: () => import('@/views/management/chapter/index')

      },
      {
        path: '/release',
        meta: { title: '随堂发布' },
        component: () => import('@/views/management/release/index')

      },
      {
        path: '/Marking',
        meta: { title: '随堂批阅' },
        component: () => import('@/views/management/Marking/index')

      },
      {
        path: '/viewOperation',
        hidden: true,
        meta: { title: '查看批阅详情' },
        component: () => import('@/views/management/Marking/viewOperation')

      },
      {
        path: '/newRelease',
        hidden: true,
        meta: { title: '新建发布', icon: 'link' },
        component: () => import('@/views/management/release/newRelease')
      }

    ]
  },
  {
    path: '/Examination',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: { title: '考试管理', icon: 'Examination' },
    children: [
      {
        path: '/XSRelease',
        meta: { title: '发布考试' },
        component: () => import('@/views/Examination/Release/index')

      },
      {
        path: '/KSMarking',
        meta: { title: '考试批阅' },
        component: () => import('@/views/Examination/Marking/index')

      }

    ]
  },
  {
	  path: '/userManagement',
	  component: Layout,
	  alwaysShow: true, // will always show the root menu
	  // roles传入权限信息
	  meta: { title: '用户管理', icon: 'system', roles: ['1'] },
	  children: [
	    {
	      path: '/competence',
	      meta: { title: '教师管理' },
	      component: () => import('@/views/system/competence/index')

	    },
	    {
	      path: '/studentManagement',
	      meta: { title: '学生管理' },
	      component: () => import('@/views/system/studentManagement/index')
	    }
	  ]
  },
  {
	  path: '/system',
	  component: Layout,
	  alwaysShow: true, // will always show the root menu
	  // roles传入权限信息
	  meta: { title: '系统管理', icon: 'system', roles: ['1'] },
	  children: [
	    {
	      path: '',
	      meta: { title: '基础数据管理' },
	      component: () => import('@/views/system/basicData')

	    },
	    {
	      path: '/theme',
	      meta: { title: '主题管理' },
	      component: () => import('@/views/system/theme/index')

	    }
	  ]
  },
  {
	  path: '/Statistics',
	  component: Layout,
	  alwaysShow: true, // will always show the root menu
	  meta: { title: '统计', icon: 'Statistics' },
	  children: [
	    {
	      path: '/knowledgePoints',
	      meta: { title: '易错知识点排名' },
	      component: () => import('@/views/Statistics/KnowledgePoints/index')
	    },
	    {
	      path: '/XSsubject',
	      meta: { title: '易错题目排名' },
	      component: () => import('@/views/Statistics/subject/index')

	    },
	    {
	      path: '/XSExamination',
	      meta: { title: '模拟考试统计' },
	      component: () => import('@/views/Statistics/Examination/index')

	    },
	    {
	      path: '/XSdetails',
	      hidden: true,
	      meta: { title: '模拟考试统计详情' },
	      component: () => import('@/views/Statistics/Examination/details')

	    }
	  ]
  },
  // { chapter
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
