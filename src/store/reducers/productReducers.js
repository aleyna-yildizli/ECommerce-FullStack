import { SET_FETCH_STATE, SET_PRODUCTS, SET_MORE_PRODUCTS, SET_ACTIVE_PAGE, FetchStates }  from '../actions/productActions'

const productInitial = {
  productList: [],
  pageCount: 0,
  activePage: 1,
  fetchState: FetchStates.NOT_FETCHED,
};

const productReducer = (state = productInitial, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload.productList,
        fetchState: FetchStates.FETCHED,
      };
    case SET_MORE_PRODUCTS:
      return {
        ...state,
        productList: [...state.productList, ...action.payload.productList], // Adding more products to existing list
        fetchState: FetchStates.FETCHED,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;