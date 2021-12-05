import React, {useEffect, useState} from 'react';
import * as RPCartManager from '../helpers/RPCartManager'
import {formatToCartObj} from '../helpers/BaseUtility'
// Take in a component as argument WrappedComponent
const withCartSubscription = WrappedComponent => {
  // And return another component
  const HOC = (props) => {
    const {item,type} = props
    const [quantity, setQuantity] = useState(props.quantity)
    useEffect(() => {}, []);
    const modifiedProps = {...props,quantity:quantity}

    const updateCart = (cartObj) =>{
      props.onLoaderStateChanged && props.onLoaderStateChanged(true)
      RPCartManager.decideAndUpdateQuantity(cartObj,() =>{
        setQuantity(cartObj.productQuantity)
        props.onUpdation && props.onUpdation();
        props.onLoaderStateChanged && props.onLoaderStateChanged(false)
      })      
    }

    return (
      <WrappedComponent
      {...modifiedProps}
      onMinusPressed={() => {
        const newQuant = quantity - 1
        let cartObj = formatToCartObj(item,newQuant,type)
        updateCart(cartObj)
      }}
      onPlusPressed={() => {
        const newQuant = quantity + 1
        let cartObj = formatToCartObj(item,newQuant,type)
        updateCart(cartObj)
      }}
      />
    );
  };
  return HOC;
};

export default withCartSubscription;
