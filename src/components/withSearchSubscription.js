import React, {useEffect, useState} from 'react';
import * as RPCartManager from '../helpers/RPCartManager'
import {formatToCartObj} from '../helpers/BaseUtility'
// Take in a component as argument WrappedComponent
const withSearchSubscription = WrappedComponent => {
  // And return another component
  const HOC = (props) => {
    const {item,type} = props
    const [quantity, setQuantity] = useState(props.quantity)

    useEffect(() => {}, []);
    const modifiedProps = {...props,quantity:quantity}

    return (
      <WrappedComponent
      {...modifiedProps}
      onSearchClicked={() => {
      }}
      />
    );
  };
  return HOC;
};

export default withSearchSubscription;
