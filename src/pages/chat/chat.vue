<template>
  <f7-page name="about">
    <f7-navbar title="About" back-link="Back"></f7-navbar>
    <f7-block-title>About My App</f7-block-title>
    <f7-block strong>
        <pre>{{friend}}</pre>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
    data(){
        return {
            friend:null
        }
    }
    ,
    created(){
        let param = decodeURIComponent(this.$f7route.params.frd)
        this.friend = param
    }
}
</script>

<style>

</style>