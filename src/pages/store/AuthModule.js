import firebase from 'firebase';

const AuthModule = {
    state:{
        signed_up : false,
    },
    getters : {
        signed_up : state => state.signed_up,
    },
    mutations : {
        setSignedUp(state,payload){
            state.signed_up = payload
        }
    },
    actions:{
        signUp({commit},payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(data=>{

                firebase.database().ref('users').child(data.user.uid).set({
                    uid: data.user.uid,
                    name: payload.name,
                    email:payload.email,
                    emailverified : false,
                    photoURL : payload.photoURL
                })

                let newuser = data.user;
                newuser.updateProfile({
                    displayName : payload.name,
                    photoURL : payload.photoURL
                }).then(()=>{
                    console.log('sukses update profile')
                    commit('setSignedUp',true)
                }).catch(err=>{
                    console.log('error 2 '+err.message);
                    commit('setAlertMessage',err.message);
                })
                
            }).catch(err=>{
                console.log('error 3'+err.message);
                commit('setAlertMessage',err.message);
            })
        }
    }
}

export default AuthModule