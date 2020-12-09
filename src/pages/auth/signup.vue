<template>
    <f7-page name="signup">
        <f7-navbar title="Sign Up" back-link="Back"></f7-navbar>
        <f7-block-title>Sign In</f7-block-title>
        <div class="wrapper">
            <img :src="image_url" alt="icon" class="image--cover" ref="file" @click="GambarFilePicker">
        </div>
        <f7-list no-hairlines-md>
            <f7-list-input :value="name" @input="name=$event.target.value" type="text" placeholder="Your name" clear-button>
            </f7-list-input>

            <f7-list-input :value="email" @input="email=$event.target.value" type="email" placeholder="Your email" clear-button>
            </f7-list-input>

            <f7-list-input :value="password" @input="password=$event.target.value" type="password" placeholder="Your password" clear-button>
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-button outline @click="signUp">Sign Up</f7-button>
            <input type="file" ref="file" style="display:none;">
        </f7-block>
    </f7-page>
</template>

<script>
import { mixin } from "../../js/mixin";
export default {
    mixins : [mixin],
    data(){
       return {
            name: null,
            email:null,
            password:null,
            image_url : 'https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg',
       }
    },
    methods:{
        signUp(){
            const self = this
            let payload = {}
            payload.name = this.name
            payload.password = this.password
            payload.email = this.email
            payload.image_url = this.image_url

            this.$store.dispatch('signUp',payload)
        },
        GambarFilePicker(){
            this.$refs.file.click()
        },
    }
}
</script>

<style scoped>
    .wrapper{
        text-align: center;
    }
    .image--cover{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 20px;
        object-fit: cover;
        object-position: center;
    }
</style>