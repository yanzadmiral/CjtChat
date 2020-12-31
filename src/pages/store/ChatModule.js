import firebase from "firebase";
import * as db from "./db"
const ChatModule = {

    state:{
        contacts :[],
        friends :[],
        friend_request : [],
    },
    getters : {
        contacts : state => state.contacts,
        friend_request : state => state.friend_request,
        friends : state => state.friends
    },
    mutations : {
        setContacts(state,payload){
            state.contacts = payload
        },
        setFriendRequest(state,payload){
            state.friend_request = payload
        },
        setFriends(state,payload){
            state.friends = payload
        }

    },
    actions:{
        connfirmRequest({},payload){
            var promise = new Promise((resolve,reject)=>{
                db.firefriends.child(firebase.auth().currentUser.uid)
                .push({uid:payload.uid})
                .then(()=>{
                    db.firefriends.child(payload.uid)
                    .push({uid:firebase.auth().currentUser.uid})
                })
                .then(()=>{
                    this.dispatch('deleteRequest',payload)
                    .then(()=>{
                        resolve(true)
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            })
            return promise
        },
        deleteRequest({},payload){
          var promise = new Promise((resolve,reject)=>{
            db.firerequest.child(firebase.auth().currentUser.uid)
            .orderByChild('sender')
            .equalTo(payload.uid)
            .once('value',snapshot=>{
                let userkey;
                for (var key in snapshot.val()) userkey = key
                db.firerequest.child(firebase.auth().currentUser.uid)
                .child(userkey)
                .remove()
                .then(()=>{
                    resolve(true)
                })
                .catch(err=>{
                    reject(err)
                })  
            }).catch(err=>{
                reject(err)
            })
          })
          return promise  
        },
        async getMyRequest({commit,dispatch}){
            var users = await dispatch('getAllUsers')
            db.firerequest.child(firebase.auth().currentUser.uid).on('value',snapshot=>{
                //console.log('getmy request',snapshot.val())
                var frd_request_id = _.map(snapshot.val(),"sender")
                //console.log('frd request',frd_request_id)
                //console.log('users',users)
                let userdetails = []
                _.forEach(frd_request_id,uuid=>{
                    var user = _.find(users,["uid",uuid])
                    userdetails.push(user)
                })
                commit('setFriendRequest',userdetails)
            } )
        },
        async getMyfriends({commit,dispatch}){
            var users = await dispatch('getAllUsers')
            db.firefriends.child(firebase.auth().currentUser.uid).on('value',snapshot=>{
                //console.log('getmy request',snapshot.val())
                var frd_id = _.map(snapshot.val(),"uid")
                //console.log('frd request',frd_request_id)
                //console.log('users',users)
                let userdetails = []
                _.forEach(frd_id,uuid=>{
                    var user = _.find(users,["uid",uuid])
                    userdetails.push(user)
                })
                commit('setFriends',userdetails)
            } )
        },
        getAllUsers({commit}){
            var promise = new Promise((resolve,reject)=>{
                firebase.database().ref('users').on('value',function (snapshot) {
                    commit('setContacts',snapshot.val())
                    resolve(snapshot.val())
                })
            })
            return promise
        },
        sendRequest({commit},payload){
            var promise = new Promise((resolve,reject)=>{
            db.firerequest.child(payload.recipient).push({sender:payload.sender})
              .then(()=>{
                resolve({success:true})
              })
              .catch(err=>{
                reject(err)
              })
            })
            return promise
          }
    }
}

export default ChatModule