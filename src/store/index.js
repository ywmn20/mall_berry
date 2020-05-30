import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state={
    cartList:[]
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})





/* mutations:{
    addCart(state,payLoad){
        //方法1
        let oProduct=null;

        for(let item of state.cartList){
            if(item.id===payLoad.id){
                oProduct=item;
            }
        }

        if(oProduct){
            oProduct.count+=1;
        }else{//payLoad是新产品
            payLoad.count=1;
            state.cartList.push(payLoad);
        }

//indexOf也可以使用


    //方法2
        let oProduct=state.cartList.find(item=>item.id===payLoad.id)

        if(oProduct){
            oProduct.count+=1;
        }else{//payLoad是新产品
            payLoad.count=1;
            state.cartList.push(payLoad);
        }
    },
 */








