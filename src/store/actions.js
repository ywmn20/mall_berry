import {CountPlus,AddToCartList} from './mutations-type'

export default {
    addCart(context,payload){    
        console.log(context)
        console.log(payload)
        
        return new Promise((resolve,rej)=>{
            let oProduct=context.state.cartList.find(item => item.id=== payload.id)
      
            if(oProduct){
                // oProduct.count+=1;
                context.commit(CountPlus,oProduct)

                resolve('数量+1')
            }else{//payLoad是新产品
                payload.count=1;
                // state.cartList.push(payLoad);
                context.commit(AddToCartList,payload)

                resolve('商品+1')
            }
        })
        




















        // let oProduct=null;

        // for(let item of context.state.cartList){
        //     if(item.id===payload.id){
        //         oProduct=item;
        //         console.log(oProduct)
        //     }
        // }

        // if(oProduct){
        //     context.commit(CountPlus,oProduct)
        // }else{//payLoad是新产品
        //     payload.count=1;
        //     // state.cartList.push(payLoad);
        //     context.commit(AddToCartList,oProduct)
        // }
        
    }
}