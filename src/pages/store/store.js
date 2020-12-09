import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './AuthModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    auth : AuthModule
  },
  state: {
    alert_message:null
  },
  getters:{
    alert_message:state=>state.alert_message
  },
  mutations: {
    setAlertMessage(state,payload){
        state.alert_message = payload
    }
  }
})