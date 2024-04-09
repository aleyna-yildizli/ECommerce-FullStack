// shoppingCardActionTypes dosyasından eylem türlerini içeri aktar
import * as types from '../actions/ShoppingCard/shoppingCardActionTypes';


const cardInitial = {
    cart: [],
    payment: {},
    address: {}
};

// Reducer fonksiyonu
const shoppingCartReducers = (state = cardInitial, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            // Sepete yeni ürün eklemek için
            // action.payload içinde gelen ürünü alıp state'in yeni bir kopyasını döndürmek gerekecek
            const existingIndex = state.cart.findIndex(item => item.product === action.payload);
            if (existingIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    count: updatedCart[existingIndex].count + 1
                };
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
                };
            }
        case types.REMOVE_FROM_CART:
            // Sepetten ürün çıkarmak
            // action.payload içinde gelen ürünün ID'sini kullanarak onu sepetten çıkarmak gerekecek
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload)
            };
        case types.CLEAR_CART:
            // Sepetteki tüm ürünleri temizlemek
            return {
                ...state,
                cart: []
            };
            case types.UPDATE_CART_ITEM_QUANTITY:
                return {
                  ...state,
                  cart: state.cart.map(item => {
                    if (item.product.id === action.payload.productId) {
                      return {
                        ...item,
                        count: action.payload.count
                      };
                    }
                    return item;
                  })
                };
            //Sepetteki ürünlerin check stateini ayarlar
        case types.CHANGE_PRODUCT_CHECKED: 
            return {
              ...state,
              cart: state.cart.map((item) =>
                item.product.id === action.payload
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            };
              
        case types.SET_PAYMENT_INFO:
            // var olan ödeme bilgileri tamamen değiştirilir
            // action.payload içinde gelen ödeme bilgileri, doğrudan payment alanına atamak gerekecek
            return {
                ...state,
                payment: action.payload
            };
        case types.SET_CHECK_STATUS:
            // Ödeme durumunu ayarlamak(örneğin, ödeme başarılı, ödeme başarısız, ödeme işlemde)
            // action.payload içinde gelen ödeme durumunu state'e eklemek gerekecek
            return {
                ...state,
                payment: {
                    ...state.payment,
                    status: action.payload
                }
            };
        case types.UPDATE_PAYMENT_INFO:
            // Ödeme bilgilerini güncellemek
            // action.payload içinde gelen güncellenmiş ödeme bilgilerini state'e eklemek gerekecek
            return {
                ...state,
                payment: {
                    ...state.payment,
                    ...action.payload
                }
            };
        case types.SET_ADDRESS_INFO:
            // Adres bilgilerini ayarlamak
            // action.payload içinde gelen adres bilgilerini state'e eklemek gerekecek
            return {
                    ...state,
                    address: action.payload
                };
        case types.ADD_TO_ADDRESSES:
            // Adreslere ekleme yapmak
            // action.payload içinde gelen yeni adres bilgilerini state'e eklemek gerekecek
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            };
        default:
            return state;
    }
};

export default shoppingCartReducers;
