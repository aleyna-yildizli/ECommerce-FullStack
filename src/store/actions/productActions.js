 import { API } from '../../api/api';


export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_MORE_PRODUCTS = 'SET_MORE_PRODUCTS';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';

export const FetchStates = {
  NOT_FETCHED: "NOT_FETCHED",
  FETCHING: "FETCHING",
  FETCHED: "FETCHED",
  FAILED: "FAILED"
};

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

// Ürünleri getirme durumunda eylem oluşturucu
export const setProducts = (productList) => ({
  type: SET_PRODUCTS,
  payload: { productList },
});

// Daha fazla ürün getirme durumunda eylem oluşturucu
export const setMoreProducts = (productList, totalProductCount) => ({
  type: SET_MORE_PRODUCTS,
  payload: { productList, totalProductCount },
});

export const setActivePage = (pageNumber) => ({
  type: SET_ACTIVE_PAGE,
  payload: pageNumber
});


// Ürünleri getirmek için thunk actionı
export const fetchProduct = () => {
  return (dispatch) => {
    API
      .get("/products")
      .then((response) => {
        dispatch(setProducts(response.data, response.data.length));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};
