<template>
    <f7-page name="signin">
        <f7-navbar title="Sign In" back-link="Back"></f7-navbar>
        <f7-block-title>Sign In</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input :value="email" @input="email=$event.target.value" type="text" placeholder="Your email" clear-button>
            </f7-list-input>

            <f7-list-input :value="password" @input="password=$event.target.value" type="password" placeholder="Your password" clear-button>
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-button outline @click="signin">Sign In</f7-button>
            <div style="text-align:center;">
                <f7-link v-if="show_resend_email" @click="resendEmial" :color="changeColor(time_left)">Resend Confirmation Email <span v-if="time_left > 0">&nbsp; {{ time_left }}</span></f7-link><br>
                <f7-link href="/signup/">Dont Have an Account? Sing Up</f7-link><br>
                <f7-link @click="forgetPassword">Forget Password</f7-link><br>
            </div>
        </f7-block>
    </f7-page>
</template>

<script>
import { setInterval,clearInterval } from "timers";
import { mixin } from "../../js/mixin";
import firebase from "firebase";
export default {
    mixins : [mixin],
    data(){
       return {
            email:null,
            password:null,
            time_left : -1,
       }
    },
    computed :{
        show_resend_email(){
            return this.$store.getters.show_resend_email
        }
    },
    methods:{
        forgetPassword(){
            const self = this
            var auth = firebase.auth();

            if (this.email != null) {
                auth.sendPasswordResetEmail(this.email).then(function() {
                    self.$store.commit('setAlertMessage','berhasil mengirim email kembali')
                }).catch(function(error) {
                    self.$store.commit('setAlertMessage',error.message)

                });
            }else{
                    self.$store.commit('setAlertMessage','Mohon Isi Email')
            }
            
        },
        changeColor(timelft){
            if (timelft<=0) {
                return '#007aff';
            }else{
                return 'gray';
            }
        },
        resendEmial(){
            const self = this
            console.log('time left',this.time_left)
            if (this.time_left <= 0) {
                self.$store.dispatch('sendEmailVerivication')
                self.countDown()
            }else{
                //this.$store.commit('setAlertMessage','mohon tunggu hingga selesai');
            }
        },
        countDown(){
            const self = this
            self.time_left = 20
            let timer = setInterval(() => {
                if (self.time_left <= 0) {
                    clearInterval(timer)
                }
                self.time_left -= 1
                console.log('time left',this.time_left)
            },1000);
        },
        signin(){
            let payload = {}
            payload.email = this.email
            payload.password = this.password
            //this.$store.commit('setSignedIn',true);
            this.$store.dispatch('signIn',payload)
        }
    }
}
</script>

<style>

</style>