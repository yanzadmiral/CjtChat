<template>
    <f7-page name="editprofile">
        <f7-navbar title="Edit Profile"></f7-navbar>
        <f7-block-title>Edit Profile</f7-block-title>
        <div class="wrapper">
            <img :src="image_url" alt="a" class="image--cover" ref="file" @click="GambarFilePicker">
        </div>
        <f7-list no-hairlines-md>
            <f7-list-input :value="display_name" @input="display_name=$event.target.value" type="text" placeholder="Your name" clear-button>
            </f7-list-input>

        </f7-list>
        <f7-block>
            <f7-button outline @click="updateProfile">Update Profile</f7-button>
            <input type="file" ref="file" style="display:none;" @change="onFilePicked">
            {{display_name}}
        </f7-block>
    </f7-page>
</template>

<script>
import firebase from "firebase";
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
        display_name :{
            get: function(){
                return this.$store.getters.display_name
            },
            set: function(value){
                this.$store.commit('setDisplayName',value)
            }
        },
        image_url(){
            return this.$store.getters.image_url
        },
        files(){
            return this.$store.getters.files
        },
        photo_url(){
            return this.$store.getters.photo_url
        }
    },
    watch:{

    },
    methods:{
        onFilePicked(){
            this.$store.dispatch('readFile')
        },
        GambarFilePicker(){
            this.$refs.file.click()
        },
        updateProfile(){
            const self = this
            let payload = {}
            var user = firebase.auth().currentUser;
            if (self.files) {
                if (this.photo_url != null) {
                    var storage = firebase.storage()
                    var httpreference = storage.refFromURL(this.photo_url);
                    httpreference.delete().then(()=>{

                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }
            if (self.files) {
                self.$store.dispatch('uploadedFile').then(url=>{
                    user.updateProfile({
                        displayName: self.display_name,
                        photoURL : url
                    }).then(function () {
                        self.$store.commit('setPhotoUrl',user.photoURL)
                        self.$store.commit('setDisplayName',user.displayName)
                        firebase.database().ref('users/'+user.uid).update({
                            photoURL : user.photoURL,
                            name : user.displayName
                        })
                    }).catch(err=>{
                        console.log(err)
                    })
                })
            }else{
                user.updateProfile({
                    displayName: self.display_name
                }).then(function () {
                    self.$store.commit('setDisplayName',user.displayName)
                    firebase.database().ref('users/'+user.uid).update({
                        name : user.displayName
                    })
                }).catch(err=>{
                    console.log(err)
                })
            }
            //this.$store.commit('setAlertMessage',self.display_name);

        }
    },
    created(){
        if (this.photo_url != null) {
            this.$store.commit('setImageUrl',this.photo_url)
        }
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