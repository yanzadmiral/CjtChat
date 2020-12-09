
const FileModule = {
    state:{
        image_url : 'https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg',
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
    },
}

export default FileModule