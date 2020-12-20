import Vue from 'vue'
import Vuex from 'vuex'
import Lodash from 'lodash'
import AuthModule from './AuthModule'
import FileModule from './FileModule'
import ChatModule from './ChatModule'

Vue.use(Vuex,Lodash)

export default new Vuex.Store({
  modules:{
    auth : AuthModule,
    file : FileModule,
    chat : ChatModule
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