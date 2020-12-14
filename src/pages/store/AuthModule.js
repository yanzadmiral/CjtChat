import firebase from 'firebase';

const AuthModule = {
    state:{
        signed_up : false,
        signed_in : false,
        show_resend_email : false,
    },
    getters : {
        signed_up : state => state.signed_up,
        signed_in : state => state.signed_in,
        show_resend_email : state => state.show_resend_email
    },
    mutations : {
        setSignedUp(state,payload){
            state.signed_up = payload
        },
        setSignedIn(state,payload){
            state.signed_in = payload
        },
        setShowResendEmail(state,payload){
            state.show_resend_email = payload
        }
    },
    actions:{
        signIn({commit},payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user=> {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user.emailVerified) {
                      commit('setSignedIn',true);
                      commit('setAlertMessage',user.displayName);
                      commit('setShowResendEmail',false)
                    } else {
                      commit('setSignedIn',false);
                      commit('setAlertMessage','Email Belum di verifikasi , mohon di verifikasi dahulu');
                      commit('setShowResendEmail',true)
                    }
                })
            })
            .catch(error=> {
                //commit('setAlertMessage',error.message);
                console.log(error.message)
            })
        },
        signUp({commit, dispatch},payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(data=>{

                firebase.database().ref('users').child(data.user.uid).set({
                    uid: data.user.uid,
                    name: payload.name,
                    email:payload.email,
                    emailVerified : false,
                    photoURL : payload.photoURL
                })

                let newuser = data.user;
                newuser.updateProfile({
                    displayName : payload.name,
                    photoURL : payload.photoURL
                }).then(()=>{
                    console.log('sukses update profile')
                    dispatch('sendEmailVerivication')
                    commit('setSignedUp',true)
                }).catch(err=>{
                    console.log('error 2 '+err.message);
                    commit('setAlertMessage',err.message);
                })
                
            }).catch(err=>{
                console.log('error 3'+err.message);
                commit('setAlertMessage',err.message);
            })
        },
        signout({commit}){
            firebase.auth().signOut().then(()=>{
                commit('setSignedIn',false);
            })
        },
        sendEmailVerivication({commit}){
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function() {
                // Email sent.
                commit('setAlertMessage','Email Sudah Terkirim')
            }).catch(function(error) {
                commit('setAlertMessage',error)
                console.log(error)
            });
        }
    }
}

export default AuthModule