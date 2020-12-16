<template>
  <f7-page name="contacts">
    <f7-navbar title="Contacts" back-link="Back"></f7-navbar>

    <f7-list media-list>
      <f7-list-item v-for="(contact,index) in contacts" :key="index"
        swipeout
        link="#"
        :title="contact.name">
        <img class="small-avatar" slot="media" :src="contact.photoURL"/>
        <f7-swipeout-actions right>
          <f7-swipeout-button color="green">Add</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    computed: {
      contacts() {
        return this.$store.getters.contacts
      }
    },
    created() {
      this.$store.dispatch('getAllUsers')
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