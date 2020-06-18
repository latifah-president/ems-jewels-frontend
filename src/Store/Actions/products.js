import {productsTypes} from "./actionTypes";
import axios from "./../../axiosInstance";

export const addProduct = (productObj) => (dispatch) => {
    dispatch ({
        type: productsTypes.ADD_PRODUCT_START,
    })
    axios.post("admin/addproduct", {...productObj}).then(res => {
        if (res.status === 201) {
            // const data = {
            //     title: projectObj.title,
            //     description: projectObj.description,
            //     price: projectObj.price,
            //     image_url: projectObj.image_url,
            //     // category: projectObj.category
            // }
            dispatch({
                type: productsTypes.ADD_PRODUCT_SUCCESS,
                payload: res.data
            })
        } else if (res.status === 400) {
            dispatch({
                type: productsTypes.ADD_PRODUCT_FAIL,
                payload: res.data.message
            })
        }
    }).catch (err => {
        dispatch({
            type: productsTypes.ADD_PRODUCT_FAIL,
            payload: err
        })
    }) 
};

export const getProducts = () => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_START,
    })
    axios.get("/products").then(res => {
        console.log("products action", res)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: productsTypes.GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_FAIL,
            payload: err
        })
    })
};

export const getProductsBy = (col, filter) => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_BY_START,
    })
    axios.get(`products/find/?col=${col}&filter=${filter}`).then(res => {
        console.log("get product triggered", res)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_BY_FAIL,
            payload: err
        })
    })
};

export const getProductsById = (id) => (dispatch) => {
    dispatch ({
        type: productsTypes.GET_PRODUCT_BY_START,
    })
    // dispatch ({
    //     type: productsTypes.GET_PRODUCT_BY_SUCCESS,
    //     payload: id
    // })
    axios.get(`products/${id}`).then(res => {
        console.log("get product by idtriggered", res)
        if (res.status === 404) {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_FAIL,
                payload: res.data.message
            })
        } else {
            dispatch ({
                type: productsTypes.GET_PRODUCT_BY_SUCCESS,
                payload: res.data
            })
        }
    }).catch (err => {
        dispatch ({
            type: productsTypes.GET_PRODUCT_BY_FAIL,
            payload: err
        })
    })
};
export default {
    addProduct,
    getProducts,
    getProductsBy,
    getProductsById,
}