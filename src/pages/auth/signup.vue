<template>
    <f7-page name="signup">
        <f7-navbar title="Sign Up" back-link="Back"></f7-navbar>
        <f7-block-title>Sign In</f7-block-title>
        <div class="wrapper">
            <img :src="image_url" alt="icon" class="image--cover">
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
        </f7-block>
    </f7-page>
</template>

<script>
export default {
    data(){
       return {
            name: null,
            email:null,
            password:null,
            image_url : 'https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg',
       }
    },
    computed:{
        alert_message(){
            return this.$store.getters.alert_message
        }
    },
    watch:{
        alert_message(value){
            const self = this
            this.ShowToastBottom(value)
            setTimeout(()=>{
                self.$store.commit('setAlertMessage',null)
            },200)  
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
        ShowToastBottom(text){
            const self = this;
            if (!self.toastBottom || self.toastBottom.destroyed) {
                self.toastBottom = self.$f7.toast.create({
                    text: text,
                    closeTimeout: 2000,
                    destroyOnClose:true
                })
                self.toastBottom.open();
            }
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