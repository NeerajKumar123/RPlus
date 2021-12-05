import * as Storage from '../helpers/RPStorage';
import {
  addTocart,
  getCartItemsList,
  removeFromCart,
  updateItemQuantityToCart,
} from '../apihelper/Api.js';
import {formatToCartObj} from '../helpers/BaseUtility'
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues'

export const updateCartDataOnServer = (cartItem, callback) =>{
  isAlreadyAdded(cartItem, (isAdded, addedItem) =>{
    if(!isAdded){
      const cartItemObj = formatToCartObj(cartItem,cartItem.productQuantity,PLUS_MINUS_BUTTON_TYPE.BackToServerCart)
      addTocart(cartItemObj, () => {
        callback && callback();
      });    
    }else{
      const updatedItem = {...addedItem,productQuantity:cartItem.productQuantity}
      const cartItemObj = formatToCartObj(updatedItem,cartItem.productQuantity,PLUS_MINUS_BUTTON_TYPE.BackToServerCart)
      if(cartItem.productQuantity < 1){
        removeFromCart(cartItemObj,()=>{
          callback && callback();
        })
      }else{
        updateItemQuantityToCart(cartItemObj, () => {
          callback && callback();
        });
      }
      }
  })
}

export const isAlreadyAdded = (cartItem, callback) =>{
  decideAndGetCartData((cartItems)=>{
    const results =  cartItems && cartItems.filter(item =>{
      return item.productID == cartItem.productID
    });
    const isAdded = results && results.length > 0
    const addedItem = isAdded ? results[0] : undefined
    callback && callback(isAdded,addedItem)
  })
}

export const decideAndUpdateQuantity = (item, callback) => {
  if (item.custID) {
    updateCartDataOnServer(item, callback)
  } else {
    Storage.updateQuantToLocalCart(item, () => {
      callback && callback();
    });
  }
};

export const decideAndGetCartData = callback => {
  const storeID = global.storeInfo && global.storeInfo.id;
  const custID = global.userInfo && global.userInfo.customer_id;
  if (custID && storeID) {
    let params = {store_id: storeID, customer_id: custID};
    getCartItemsList(params, res => {
      let cartItems = res && res.payload_cartList;
      let mappedCartItems = []
      cartItems && cartItems.forEach(element => {
        mappedCartItems.push(formatToCartObj(element,undefined,PLUS_MINUS_BUTTON_TYPE.APICartItem))
      });
      callback && callback(mappedCartItems);
    });
  } else {
    Storage.getUserCartData(cartItems => {
      callback && callback(cartItems);
    });
  }
};
export const getCartsFromLocalDB = callback => {
  Storage.getUserCartData(cartItems => {
    callback && callback(cartItems);
  });
};
