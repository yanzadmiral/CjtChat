<template>
    <f7-page name="editprofile">
        <f7-navbar title="Edit Profile"></f7-navbar>
        <f7-block-title>Edit Profile</f7-block-title>
        <div class="wrapper">
            <img :src="image_url" alt="a" class="image--cover" ref="file" @click="GambarFilePicker">
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
            <input type="file" ref="file" style="display:none;" @change="onFilePicked">
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
       }
    },
    computed:{
        image_url(){
            return this.$store.getters.image_url
        },
        files(){
            return this.$store.getters.files
        },
        signed_up(){
            return this.$store.getters.signed_up
        }
    },
    watch:{
        signed_up(value){
            if (value == true) {
                this.$f7router.navigate('/signin/')
            }
        }
    },
    methods:{
        signUp(){
            const self = this
            let payload = {}
            payload.name = this.name
            payload.password = this.password
            payload.email = this.email
            payload.photoURL = this.image_url
            if (self.files) {
                self.$store.dispatch('uploadedFile').then(url=>{
                    payload.photoURL = url
                    self.$store.dispatch('signUp',payload)
                    
                })
            }else{
                this.$store.dispatch('signUp',payload)
            }
            
        },
        onFilePicked(){
            this.$store.dispatch('readFile')
        },
        GambarFilePicker(){
            this.$refs.file.click()
        },
    },
    created(){
        this.$store.commit('setSignedUp',false)
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