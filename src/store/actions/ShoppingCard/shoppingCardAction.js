import * as types from './shoppingCardActionTypes'
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import {API} from '../../../api/api'


// Action Creators


// Sepete ürün eklemek için eylem oluşturucu
export const addToCart = (product) => ({
    type: types.ADD_TO_CART,
    payload: product
});

// Sepetten ürünü kaldırmak için eylem oluşturucu
export const removeFromCart = (productId) => ({
    type: types.REMOVE_FROM_CART,
    payload: productId
});

//Sepetteki (un)check edilen ürünleri sipariş özetine eklemek(kaldırmak) için eylem oluşturucu
export const toggleCheck = (productId) => ({ 
    type: types.CHANGE_PRODUCT_CHECKED,
    payload: productId
});

//Sepetteki ürünlere kupon kodu uygulayan eylem oluşturucu
export const addCoupon = () => ({
    type: types.COUPON_CODE_USE 
})

// Sepetteki tüm ürünleri temizlemek için eylem oluşturucu
export const clearCart = () => ({
    type: types.CLEAR_CART
});

// Ödeme bilgilerini ayarlamak için eylem oluşturucu
export const setPaymentInfo = (paymentInfo) => ({
    type: types.SET_PAYMENT_INFO,
    payload: paymentInfo
});

// Adres bilgilerini ayarlamak için eylem oluşturucu
export const setAddressInfo = (addressInfo) => ({
    type: types.SET_ADDRESS_INFO,
    payload: addressInfo
});

// Sepet öğe miktarını güncellemek için eylem oluşturucu
export const updateCartItemQuantity = (productId, count) => ({
    type: types.UPDATE_CART_ITEM_QUANTITY,
    payload: {
      productId,
      count
    }
  });

// Ödeme durumunu ayarlamak için eylem oluşturucu
export const setCheckStatus = (status) => ({
    type: types.SET_CHECK_STATUS,
    payload: status
});

// Ödeme bilgilerini güncellemek için eylem oluşturucu
export const updatePaymentInfo = (updatedInfo) => ({
    type: types.UPDATE_PAYMENT_INFO,
    payload: updatedInfo
});


// Kullanıcının kayıtlı adres listesini almak için thunk actionı
export const fetchAddresses = () => async (dispatch) => {
    try {
      const response = await API.get("/user/address");
      dispatch({ type: types.FETCH_ADDRESSES, payload: response.data });
      console.log("Addresses fetched:", response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };


  export const addToAddresses = (newAddress) => async (dispatch) => {
    try {
      await API.post("/user/address", newAddress);
      dispatch(fetchAddresses());
      toast.success("Address added successfully", { position: "top-right" });
    } catch (error) {
      console.error("Address adding failed!", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  export const updateAddress = (id, addressData) => {
    return (dispatch) => {
      API.put('/user/address', { id, ...addressData })
        .then((response) => {
          dispatch(fetchAddresses()); 
          toast.success("Address updated successfully", { position: "top-right" });
        })
        .catch((error) => {
          toast.error("Error updating address", { position: "top-right" });
          console.error("Error updating address:", error);
        });
    };
  };

  export const deleteAddress = (id) => {
    return (dispatch) => {
      API.delete(`/user/address/${id}`)
        .then((response) => {
          dispatch(fetchAddresses());
          toast.success("Address deleted successfully", { position: "top-right" });
        })
        .catch((error) => {
          toast.error("Error deleting address", { position: "top-right" });
          console.error("Error deleting address:", error);
        });
    };
  };
