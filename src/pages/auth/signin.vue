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
                <f7-link @click="resendEmial">Resend Confirmation Email <span v-if="time_left > 0">&nbsp; {{ time_left }}</span></f7-link><br>
                <f7-link href="/signup/">Dont Have an Account? Sing Up</f7-link><br>
                <f7-link>Forget Password</f7-link><br>
            </div>
        </f7-block>
    </f7-page>
</template>

<script>
import { mixin } from "../../js/mixin";
export default {
    mixins : [mixin],
    data(){
       return {
            email:null,
            password:null,
            time_left : -1,
       }
    },
    methods:{
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