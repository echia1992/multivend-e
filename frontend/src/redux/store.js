import { configureStore } from "@reduxjs/toolkit";
import { customerReducer } from "./reducer/customer";
// import { sellerReducer } from "./reducers/seller";
// import { productReducer } from "./reducers/product";
// import { eventReducer } from "./reducers/event";
// import { cartReducer } from "./reducers/cart";
// import { wishlistReducer } from "./reducers/wishlist";
// import { orderReducer } from "./reducers/order";

//
 const Store = configureStore({
     reducer: {
          customer: customerReducer,
//         // seller: sellerReducer,
//         // products: productReducer,
//         // events: eventReducer,
//         // cart: cartReducer,
//         // wishlist: wishlistReducer,
//         // order: orderReducer,
     },
 });

 export default Store;
