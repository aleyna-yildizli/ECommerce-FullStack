// globalActions.js

export const SET_ROLES = 'SET_ROLES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

import { API } from '../../api/api.js'


//Kategorileri ayarlamak için eylem oluşturucu
export const setCategories = () => (dispatch) => {
    return API.get("/categories")
        .then((response) => {
            dispatch({ type: SET_CATEGORIES, payload: response.data })
        })
        .catch((error) => {
            console.log(error.message);
        });
}; 


// Rollerin alınması için özel thunk eylem oluşturucu
// Alınan roller, setRoles eylemi aracılığıyla store'a aktarılır
export const setRoles = () => {
    return async (dispatch, getState) => {
        const { roles } = getState().global;
        if (!roles.length) {
            try {
                const response = await API.get("/roles");
                dispatch({ type: 'SET_ROLES', payload: response.data });
            } catch (error) {
                console.error(error.message);
            }
        }
    };
};

// Temayı ayarlamak için eylem oluşturucu
export const setTheme = (theme) => ({
    type: SET_THEME, payload: theme
});


// Dil seçeneğini ayarlamak için eylem oluşturucu
export const setLanguage = (language) => ({
    type: SET_LANGUAGE, payload: language
});

