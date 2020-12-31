<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>CjtChat</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/requests/">
          <f7-icon f7="person_circle">
            <span class="badge color-red" v-if="friendrequest.length>0">{{friendrequest.length}}</span>
          </f7-icon>
        </f7-link>
        <f7-link icon-f7="person_crop_circle_badge_plus" href="/contacts/">

        </f7-link>
      </f7-nav-right>
      <f7-nav-title-large>CjtChat</f7-nav-title-large>
    </f7-navbar>
    <!-- Toolbar-->
    
    <!-- Page content-->
    <f7-list media-list>
      <f7-list-item v-for="(frd,index) in friends" :key="index"
        swipeout
        link="#"
        :title="frd.name">
        <img class="small-avatar" slot="media" :src="frd.photoURL"/>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
export default {
  computed:{
      friends(){
        return this.$store.getters.friends
      },
      friendrequest(){
        return this.$store.getters.friend_request
      }
  },
  created(){
      this.$store.dispatch('getMyfriends')
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