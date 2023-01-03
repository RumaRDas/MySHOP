import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'

const reducer = {
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer
}
//get cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const preloadedState = {
    cart: { cartItems: cartItemsFromStorage }
}
// const middleware = [thunk]

const store = configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production', //only show devTools when in production
})
export default store