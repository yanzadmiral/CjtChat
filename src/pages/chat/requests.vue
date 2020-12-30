<template>
  <f7-page name="requests">
    <f7-navbar title="Request" back-link="Back"></f7-navbar>
    <f7-block-title>Friend Request</f7-block-title>
      <f7-list media-list>
      <f7-list-item v-for="(friend_requests,index) in friend_request" :key="index"
        swipeout
        link="#"
        :title="friend_requests.name">
        <img class="small-avatar" slot="media" :src="friend_requests.photoURL"/>
        <f7-swipeout-actions right>
          <f7-swipeout-button color="red" @click="remove(friend_requests)">Remove</f7-swipeout-button>
          <f7-swipeout-button color="green" @click="confirm(friend_requests)">Confirm</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  methods:{
    confirm(value){

    },
    remove(value){
      this.$store.dispatch('deleteRequest',value)
    }
  },
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

<style scoped>
.small-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }
</style>