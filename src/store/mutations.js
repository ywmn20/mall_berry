import {CountPlus,AddToCartList} from './mutations-type'

export default {
    [CountPlus](state,payload){
        console.log('mu1')
        payload.count++;
    },
    [AddToCartList](state,payload){
        console.log('mu2')
        payload.checked=true;
        state.cartList.push(payload);
    }
}