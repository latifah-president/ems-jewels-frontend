import { productsTypes } from '../Actions/actionTypes.js';

const initialState = {
    products: [],
    // category: null,
    error: false,
    errorMsg: null,
    loading: false
}

export default (state = initialState, actions) => {
    
    switch (actions.type) {
        case productsTypes.ADD_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                // id: actions.payload.id,
                // title: actions.payload.title,
                // description: actions.payload.description,
                // image_url: actions.payload.image_url,
                // category: actions.payload.category,
            }
        case productsTypes.ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
        case productsTypes.GET_PRODUCT_START:
            return {
                ...state,
                loading: true,
            }
        case productsTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: actions.payload,
            }
        case productsTypes.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload
            }
        case productsTypes.GET_PRODUCT_BY_START:
                return {
                    ...state,
                    loading: true,
                }
        case productsTypes.GET_PRODUCT_BY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    products: actions.payload,
                }
        case productsTypes.GET_PRODUCT_BY_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: true,
                    errorMsg: actions.payload
                }
                case productsTypes.GET_PRODUCT_BY_ID_START:
                    return {
                        ...state,
                        loading: true,
                    }
        case productsTypes.GET_PRODUCT_BY_ID_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        

                    }
        case productsTypes.GET_PRODUCT_BY_ID_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: true,
                        errorMsg: actions.payload
                    }
        default:
            return state;
    };
    
};

