// SEPETTEKİ ÜRÜNLER İÇİN EYLEM TÜRLERİ
export const ADD_TO_CART = 'ADD_TO_CART'; // Sepete ürün eklemek için eylem türü
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; // Sepetten ürün çıkarmak için eylem türü
export const CLEAR_CART = 'CLEAR_CART'; // Sepeti temizlemek için eylem türü
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY"; // Sepet öğe miktarını güncellemek için eylem türü
export const CHANGE_PRODUCT_CHECKED = "CHANGE_PRODUCT_CHANGED"; //Sepetteki (un)check edilen ürünleri sipariş özetine eklemek(kaldırmak) için eylem oluşturucu
export const COUPON_CODE_USE = "COUPON_CODE_USE"; // Sepetteki ürünlere kupon kodu uygulayan eylem türü

//ÖDEME BİLGİLERİ İÇİN EYLEM TÜRLERİ
export const SET_PAYMENT_INFO = 'SET_PAYMENT_INFO'; // Ödeme bilgilerini ayarlamak için eylem türü
export const SET_CHECK_STATUS = "SET_CHECK_STATUS"; // Ödeme işleminin durumununu ayarlamak için eylem türü
export const UPDATE_PAYMENT_INFO = 'UPDATE_PAYMENT_INFO'; // Ödeme bilgilerini güncellemek için eylem türü

//ADRES BİLGİLERİ İÇİN EYLEM TÜRLERİ
export const SET_ADDRESS_INFO = 'SET_ADDRESS_INFO'; // Adres bilgilerini ayarlamak için eylem türü
export const ADD_TO_ADDRESSES = 'ADD_TO_ADDRESSES'; // Adreslere ekleme yapmak için eylem türü
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';