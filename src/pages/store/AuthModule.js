import firebase from 'firebase';

const AuthModule = {
    actions:{
        signUp({commit},payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(data=>{

                firebase.database().ref('users').child(data.user.uid).set({
                    uid: data.user.uid,
                    name: payload.name,
                    email:payload.email,
                    emailverified : false
                })

                let newuser = data.user;
                newuser.updateProfile({
                    displayName:payload.name,
                    photoURL:payload.photoURL
                }).then(()=>{
                    console.log('updateprofile')
                }).catch(err=>{
                    console.log(err.message);
                    commit('setAlertMessage',err.message);
                })
                
            }).catch(err=>{
                console.log(err.message);
                commit('setAlertMessage',err.message);
            })
        }
    }
}

export default AuthModule