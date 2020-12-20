<template>
  <f7-page name="requests">
    <f7-navbar title="Request" back-link="Back"></f7-navbar>
    <f7-block-title>About My Requests</f7-block-title>
    <f7-block strong>
      <pre>{{friend_request}}</pre>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  computed:{
    friend_request(){
      return this.$store.getters.friend_request
    }
  },
  created(){
    this.$store.dispatch('getMyRequest')
  }
}
</script>