import firebase from 'firebase'

const FileModule = {
    state:{
        image_url : 'https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg',
        files : null,
    },
    getters : {
        image_url : state=> state.image_url,
        files : state=> state.files,
    },
    mutations : {
        setImageUrl(state,payload){
            state.image_url = payload
        },
        setFiles(state,payload){
            state.files = payload
        },
    },
    actions : {
        readFile({commit}){
            const files = event.target.files
            commit('setFiles',files)
            const fileReader = new FileReader()
            let file = files[0]
            if (file['size'] < 200000) {
                fileReader.readAsDataURL(file)
                fileReader.addEventListener('load',()=>{
                    var imageUrl = fileReader.result;
                    commit('setImageUrl',imageUrl)
                })
            }else{
                commit('setAlertMessage','Image tidak boleh lebih dari 200')
                return
            }
        },
        uploadedFile({commit,state}){
             return new Promise((resolve,reject)=>{
                var file = state.files[0]
                var storageRef = firebase.storage().ref('profile/'+file.name)
                var uploadTask = storageRef.put(file)
                uploadTask.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // switch (snapshot.state) {
                    //   case firebase.storage.TaskState.PAUSED: // or 'paused'
                    //     console.log('Upload is paused');
                    //     break;
                    //   case firebase.storage.TaskState.RUNNING: // or 'running'
                    //     console.log('Upload is running');
                    //     break;
                    // }
                  }, function(error) {
                    // Handle unsuccessful uploads
                  }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      resolve(downloadURL)
                    });
                  });
            })
        },
    },
}

export default FileModule