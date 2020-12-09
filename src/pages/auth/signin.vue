<template>
    <f7-page name="signin">
        <f7-navbar title="Sign In" back-link="Back"></f7-navbar>
        <f7-block-title>Sign In</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input :value="email" @input="email=$event.target.value" type="text" placeholder="Your name" clear-button>
            </f7-list-input>

            <f7-list-input :value="password" @input="password=$event.target.value" type="password" placeholder="Your password" clear-button>
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-button outline>Sign In</f7-button>
            <div style="text-align:center;">
                <f7-link>Resend Confirmation Email</f7-link><br>
                <f7-link href="/signup/">Dont Have an Account? Sing Up</f7-link><br>
                <f7-link>Forget Password</f7-link><br>
            </div>
        </f7-block>
    </f7-page>
</template>

<script>
export default {
    data(){
       return {
            email:null,
            password:null,
       }
    }
}
</script>

<style>

</style>