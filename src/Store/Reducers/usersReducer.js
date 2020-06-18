import { authTypes, userTypes } from '../Actions/actionTypes.js';

const initialState = {
    // user: [],
    firebase_id: null,
    email: null,
    first_name: null,
    last_name: null,
    address: null,
    city: null, 
    state: null,
    zip: null,
    phone: null,
    cart: [],
    loading: false,
    loggedIn: false,
    error: null,
    successmsg: null,
    total: null,
    authenticate: false,
    admin: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case authTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case authTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                firebase_id: action.payload.userData.firebase_id,
                email: action.payload.userData.email,
                first_name: action.payload.userData.first_name,
                last_name: action.payload.userData.last_name,
                address: action.payload.userData.address,
                city: action.payload.userData.city, 
                state: action.payload.userData.state,
                zip: action.payload.userData.zip,
                phone: action.payload.userData.phone,
                cart: action.payload.cartItem,
                total: action.payload.total,
                admin: action.payload.userData.admin,

            }
        case authTypes.AUTH_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
                case authTypes.LOGOUT_START:
                    return {
                        ...state,
                        loading: true
                    }
                case authTypes.LOGOUT_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        loggedIn: false,
                    }
                case authTypes.LOGOUT_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                    case authTypes.LOGIN_START:
                        return {
                            ...state,
                            loading: true
                        }
                    case authTypes.LOGIN_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            loggedIn: action.payload,
                        }
                    case authTypes.LOGIN_FAIL:
                        return {
                            ...state,
                            loading: false,
                            error: action.payload
                        }
        case userTypes.ADD_TO_CART_START:
                    return {
                        ...state,
                        loading: true
                    }
        case userTypes.ADD_TO_CART_SUCCESS:
                    
                    return {
                        ...state,
                        loading: false,
                        cart: state.cart.map(item =>
                            item.id === action.payload ? {...item, quantity: item.quantity + 1} : item,
                          ),
                    }
        case userTypes.ADD_TO_CART_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
        case userTypes.GET_USER_BY_START:
                        return {
                            ...state,
                            loading: true
                        }
        case userTypes.GET_USER_BY_SUCCESS:
            return {
                ...state,
                loading: false,
                firebase_id: action.payload.userData.firebase_id,
                email: action.payload.userData.email,
                first_name: action.payload.userData.first_name,
                last_name: action.payload.userData.last_name,
                address: action.payload.userData.address,
                city: action.payload.userData.city, 
                state: action.payload.userData.state,
                zip: action.payload.userData.zip,
                phone: action.payload.userData.phone,
                admin: action.payload.userData.admin,
                cart: action.payload.cartItem,
                total: action.payload.total
            }
        case userTypes.GET_USER_BY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userTypes.GET_CART_START:
            return {
                    ...state,
                    loading: true
                }
        case userTypes.GET_CART_SUCCESS:
            console.log("get cart payload", action.payload.cartItem)
            return {
                    ...state,
                    loading: false,
                    cart: action.payload.cartItem,
                    total: action.payload.total
                }
        case userTypes.GET_CART_FAIL:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
        case userTypes.REMOVE_FROM_CART_START:
            return {
                ...state,
                loading: true
            }
        case userTypes.REMOVE_FROM_CART_SUCCESS:
            console.log("removed item", action.payload)
            return {
                ...state,
            //    cart: action.payload.cartItem,
               cart: state.cart.filter(item => item.id !== action.payload),
               //cubtract price from total
            //    total: state.cart.find( item  =>  action.payload === item.id ? {...item, total: state.total - item.price} : state.total )
            }

        case userTypes.REMOVE_FROM_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case authTypes.LOGIN_START:
                return {
                    ...state,
                    loading: true
                }
            case authTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    authenticate: true,
                }
            // case authTypes.LOGIN_FAIL:
            //     return {
            //         ...state,
            //         loading: false,
            //         error: action.payload
            //     }
            default:
            return state;
    };
};