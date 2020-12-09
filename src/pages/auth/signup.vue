<template>
    <f7-page name="signup">
        <f7-navbar title="Sign Up" back-link="Back"></f7-navbar>
        <f7-block-title>Sign In</f7-block-title>
        <div class="wrapper">
            <img :src="image" alt="icon" class="image--cover">
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
            <f7-button outline>Sign Up</f7-button>
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
            image : 'https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg',
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