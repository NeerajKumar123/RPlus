import API from './BaseAPI';

export const getAddressByLatLong = ( lat, long, callback) => {
  const latLongPath = `latlng=${lat},${long}&key=AIzaSyDpdF27ZiuKLmsJXNfLyRbD-7nmlMa4tJw`
  const path = `https://maps.googleapis.com/maps/api/geocode/json?${latLongPath}`
  API.makeGetRequest(path,callback);
};
/// this is test commit to check gitignore
export const getStoreListingByPincode = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/storeListing';
  API.makePostRequest(path, params, callback);
};

export const getHoneyMoneyStoreList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/hmtStore';
  API.makePostRequest(path, params, callback);
};

export const getCategoryListingByPincode = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/categoryListing';
  API.makePostRequest(path, params, callback);
};

export const getStoreListingByCategory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/storeListingByCategory';
  API.makePostRequest(path, params, callback);
};

export const getVerticalList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/verticalList';
  API.makePostRequest(path, params, callback);
};
export const getStoreBanner = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/banner';
  API.makePostRequest(path, params, callback);
};
export const searchProduct = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/searchProduct';
  API.makePostRequest(path, params, callback);
};
export const getVerticalByCategory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/verticalByCategory';
  API.makePostRequest(path, params, callback);
};

export const getCategoryBySubCategory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/categoryBySubCategory';
  API.makePostRequest(path, params, callback);
};
export const getProductByVerticalAndStore = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/VerticalByProduct';
  API.makePostRequest(path, params, callback);
};
export const getProductByCategoryAndStore = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/CategoryByProduct';
  API.makePostRequest(path, params, callback);
};
export const getProductBySubCategory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/SubCategoryByProduct';
  API.makePostRequest(path, params, callback);
};
export const getProductDetails = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/productDetail';
  API.makePostRequest(path, params, callback);
};
export const getHotDeals = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/hotDeals';
  API.makePostRequest(path, params, callback);
};
export const getDealsOfTheDay = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/normalDeals';
  API.makePostRequest(path, params, callback);
};
export const getPromoBanners = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/promobanner';
  API.makePostRequest(path, params, callback);
};
export const getSectionBanners = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/sectionbanner';
  API.makePostRequest(path, params, callback);
};
export const sendOtp = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/sendotp';
  API.makePostRequest(path, params, callback);
};
export const verifyOtp = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/verifyotp';
  API.makePostRequest(path, params, callback);
};
export const updatePersonalInfo = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/updateInfo';
  API.makePostRequest(path, params, callback);
};

export const sentOTPExistingUser = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/sendExistUserOtp';
  API.makePostRequest(path, params, callback);
};

export const verifyOTPExistingUser = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/verifyExistUserOtp';
  API.makePostRequest(path, params, callback);
};

export const updateExistingUserInfo = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/saveExistUser';
  API.makePostRequest(path, params, callback);
};
export const addTocart = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/addTocart';
  API.makePostRequest(path, params, callback);
};

export const getCartItemsList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/cartList';
  API.makePostRequest(path, params, callback);
};

export const updateItemQuantityToCart = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/updateTocart';
  API.makePostRequest(path, params, callback);
};

export const removeFromCart = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/removeTocart';
  API.makePostRequest(path, params, callback);
};

export const addTocartMultiple = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/addTocartMultiple';
  API.makePostRequestFormData(path, params, callback);
};

export const updateTocartMultiple = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/updateTocartMultiple';
  API.makePostRequest(path, params, callback);
};

export const addToaddress = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/addToaddress';
  API.makePostRequest(path, params, callback);
};

export const getAddressList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/addressList';
  API.makePostRequest(path, params, callback);
};
export const getAddressDetail = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/addressDetail';
  API.makePostRequest(path, params, callback);
};

export const updateToaddress = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/updateToaddress';
  API.makePostRequest(path, params, callback);
};

export const removeToaddress = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/removeToaddress';
  API.makePostRequest(path, params, callback);
};

export const checkCoupon = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/checkCoupon';
  API.makePostRequest(path, params, callback);
};

export const getCouponList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/couponList';
  API.makePostRequest(path, params, callback);
};

export const getDeliveryCharge = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/deliveryCharge';
  API.makePostRequest(path, params, callback);
};

export const getDeliveryDateTimeSlots = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/timeSlot';
  API.makePostRequest(path, params, callback);
};

export const getOrdersList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/orderList';
  API.makePostRequest(path, params, callback);
};
export const getOrderDetails = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/orderDetails';
  API.makePostRequest(path, params, callback);
};

export const cashonDelivery = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/cashOnDelivery';
  API.makePostRequest(path, params, callback);
};

export const cancelOrder = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/orderCancelled';
  API.makePostRequest(path, params, callback);
};

export const rescheduleOrder = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/orderReschedule';
  API.makePostRequest(path, params, callback);
};

export const cancelItem = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/orderItemCancel';
  API.makePostRequest(path, params, callback);
};

export const cartSimilarProduct = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/cartSimilarProduct';
  API.makePostRequest(path, params, callback);
};

export const onlinePaymentProcess = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/onlinePaymentProcess';
  API.makePostRequest(path, params, callback);
};

export const onlinePaymentSuccess = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/onlinePaymentSuccess';
  API.makePostRequest(path, params, callback);
};

export const getReferralCode = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/getReferralCode';
  API.makePostRequest(path, params, callback);
};

export const checkReferralCode = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/checkReferralCode';
  API.makePostRequest(path, params, callback);
};

export const pointHistory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/pointHistory';
  API.makePostRequest(path, params, callback);
};

export const redeemPoints = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/redeemPoints';
  API.makePostRequest(path, params, callback);
};

export const userDetails = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/userDetails';
  API.makePostRequest(path, params, callback);
};

export const cashHistory = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/cashHistory';
  API.makePostRequest(path, params, callback);
};

export const topupPaymentProcess = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/topupPaymentProcess';
  API.makePostRequest(path, params, callback);
};

export const topupPaymentSuccess = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/topupPaymentSuccess';
  API.makePostRequest(path, params, callback);
};

export const topupOffer = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/topupOffer';
  API.makePostRequest(path, params, callback);
};

export const walletTransection = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/walletTransection';
  API.makePostRequest(path, params, callback);
};

export const tncList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/termsList';
  API.makePostRequest(path, params, callback);
};

export const faqList = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/user/faqList';
  API.makePostRequest(path, params, callback);
};

export const getVerticaldesign = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/verticaldesign';
  API.makePostRequest(path, params, callback);
};
export const getGdeesStores = ( params, callback) => {
  const path = 'https://rewardsplus.in/api/store/gdeesStore';
  API.makePostRequest(path, params, callback);
};

export const getStoreList = ( params, storeListName, callback) => {
  const path = `https://rewardsplus.in/api/store/${storeListName}`;
  API.makePostRequest(path, params, callback);
};
export const getNotification = ( params, callback) => {
  const path = `https://rewardsplus.in/api/store/notification`;
  API.makePostRequest(path, params, callback);
};

export const getNewarrivalAllItems = ( params, callback) => {
  const path = `https://rewardsplus.in/api/store/newarrivalRandom`;
  API.makePostRequest(path, params, callback);
};

export const getNewarrivalAllCategoryByStore = ( params, callback) => {
  const path = `https://rewardsplus.in/api/store/newarrivalCategory`;
  API.makePostRequest(path, params, callback);
};

export const getNewarrivalProductsByCategory = ( params, callback) => {
  const path = `https://rewardsplus.in/api/store/newarrival`;
  API.makePostRequest(path, params, callback);
};





