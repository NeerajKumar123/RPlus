export const PLUS_MINUS_BUTTON_TYPE = {
  DealsOfTheDayDashboard: 1,
  HotDealsDashboardCard: 2,
  ComboOffersDashboardCard: 3,
  VertialProductCard: 4,
  FeeaturedSimilarProductCard: 5,
  CartCard: 6,
  ProductDetails:7,
  APICartItem:8,
  BackToServerCart:9
};

export const RP_REGEX = {
  Name: '^[a-zA-Z]{2,30}$',
  FullName :/^([\w]{2,})+\s?([\w\s]{2,})+$/i,
  Email:
    '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,4})$',
  Mobile: '^[6789]{1}[0-9]{9}$'
};
