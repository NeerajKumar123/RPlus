import * as React from 'react';
import {Alert} from 'react-native';
import moment from 'moment';
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues';
export const rpLoaderRef = React.createRef();
import AppConfigData from '../constants/AppConfigData'


export const showToast = msg => {
  const AppData = AppConfigData()
  Alert.alert(AppData.title_alert, msg);
};

const showLoader = () => {
  rpLoaderRef?.current?.show();
};

const hideLoader = () => {
  rpLoaderRef?.current?.hide();
};

export const formatToCartObj = (item, quantity, itemType) => {
  const storeID = global?.storeInfo?.id;
  const custID = global?.userInfo?.customer_id;
  const companyID = global?.storeInfo?.company_id;
  let cartObj = {};
  switch (itemType) {
    case PLUS_MINUS_BUTTON_TYPE.DealsOfTheDayDashboard:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.deals_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.HotDealsDashboardCard:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.deals_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.ComboOffersDashboardCard:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.deals_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.VertialProductCard:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.selling_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.FeeaturedSimilarProductCard:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.selling_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.CartCard:
      cartObj = {...item};
      cartObj.productQuantity = quantity;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.ProductDetails:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.selling_price);
      cartObj.productName = item.name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = parseInt(quantity);
      cartObj.storeID = storeID;
      cartObj.custID = custID;
      cartObj.companyID = companyID;
      break;
    case PLUS_MINUS_BUTTON_TYPE.APICartItem:
      cartObj.maxPrice = parseInt(item.mrp);
      cartObj.sellingPrice = parseInt(item.selling_price);
      cartObj.productName = item.product_name;
      cartObj.productID = item.product_id;
      cartObj.productImage = item.image ? item.image : '';
      cartObj.productQuantity = item.quantity;
      cartObj.maxAllowedQuantity = item.no_of_quantity_allowed;
      cartObj.storeID = item.store_id;
      cartObj.custID = custID;
      cartObj.companyID = item.company_id;
      cartObj.cartID = item.cart_id
      cartObj.isDeal = item?.is_deal
      cartObj.dealTypeID = item?.deal_type_id
      const isAvl = item.is_available == 1
      const isStock = item.is_stock == 1
      if(isAvl == true){
        cartObj.isOutOfStock = !isStock
      }else{
        cartObj.isOutOfStock = true
      }
      break;
    case PLUS_MINUS_BUTTON_TYPE.BackToServerCart:
      cartObj.company_id = item.companyID;
      cartObj.store_id = item.storeID;
      cartObj.selling_price = item.sellingPrice;
      cartObj.customer_id = item.custID;
      cartObj.product_id = item.productID;
      cartObj.product_name = item.productName;
      cartObj.mrp = item.maxPrice;
      cartObj.quantity = item.productQuantity;
      cartObj.cart_id = item.cartID
      break;
    default:
      break;
  }
  return cartObj;
};

export const areEqualDates = (first, second) => {
  const isSameYears = first.getFullYear() == second.getFullYear();
  const isSameMonth = first.getMonth() == second.getMonth();
  const isSameDay = first.getDate() == second.getDate();
  return isSameYears && isSameMonth && isSameDay;
};

export const getDateFromstring = dateString => {
  var dateString = dateString; // Oct 23
  var dateMomentObject = moment(dateString, 'DD-MM-YYYY'); // 1st argument - string, 2nd argument - format
  var dateObject = dateMomentObject.toDate(); // convert moment.js object to Date object
  return dateObject;
};

export const isEmpty = (value) => {
  return typeof value === 'undefined' || value === null || value.length == 0;
};

export default {
  hideLoader,
  showLoader,
  showToast
};
