<template>
  <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
  export default{
    props:['contentText'],
    data(){
      return {
        content:'',
        editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike','code','image'],        // toggled buttons
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              ['blockquote', 'code-block'],
            ]
          }
        }
      }
    },
    watch:{
      contentText(){
        console.log(this.contentText)
        this.content=this.contentText
      },
    },
    methods:{
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
        this.$emit('onEditorChange',this.content)
      }
    },
    created(){
      this.content=this.contentText
    },
  }
</script>

<style scoped>
  .quill-editor{
    height: 220px;
    box-sizing: border-box;
  }
</style>
