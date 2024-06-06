import axios from "axios";

const BASE_URL = "http://localhost:9191/api/v1/ecommerce";

export const createApiInstance = () => {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true // Kimlik doğrulama bilgilerini göndermek için
    });
  };


let API = createApiInstance();

const renewAPI = () => {
    API = createApiInstance();
};

renewAPI();

export { API, renewAPI };



{/* API işlemlerini başka bir dosyada yöneterek, kodumu daha modüler hale getirdim ve tekrar kullanılabilirliği arttırdım. 
Bu sayede, API isteklerini yöneten kodları ayrı bir dosyada toplayabilir ve gerektiğinde farklı bileşenlerde kullanabilirim.*/}




