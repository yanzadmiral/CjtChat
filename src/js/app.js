// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import firebase from 'firebase';
import store from '../pages/store/store.js';
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
let newapp = null
firebase.auth().onAuthStateChanged(function(user) {
  if (user && user.emailVerified) {
    store.commit('setSignedIn',true)
  } else {
    store.commit('setSignedIn',false)
  }
  if (!newapp) {
    newapp = // Init App
    new Vue({
      el: '#app',
      render: (h) => h(App),store,
    
      // Register App Component
      components: {
        app: App
      },
    });
  }
})
