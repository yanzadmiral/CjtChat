export const mixin = {
    computed:{
        alert_message(){
            return this.$store.getters.alert_message
        },
    },
    watch:{
        alert_message(value){
            const self = this
            this.ShowToastBottom(value)
            setTimeout(()=>{
                self.$store.commit('setAlertMessage',null)
            },200)  
        },
    },
    methods:{
        ShowToastBottom(text){
            const self = this;
            if (!self.toastBottom || self.toastBottom.destroyed) {
                self.toastBottom = self.$f7.toast.create({
                    text: text,
                    closeTimeout: 2000,
                    destroyOnClose:true
                })
                self.toastBottom.open();
            }
        },
    }
}