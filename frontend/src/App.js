import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {
    HomePage,
    ActivationPage,
    ProductsPage,
    ProductDetailPage,
    BestSellingPage,
    EventsPage,
    FAQPage,
    CareerPage,
    SignUpPage,
    LoginPage,
    OrderDetailsPage,
    ProfilePage
} from './routes/Routes.js'
import { ShopDashboardPage } from './routes/ShopRoutes.js'
import Store from "./redux/store";
import {LoadAdmin, LoadSeller, LoadUser} from "./redux/action/user";
import ProtectedRoute from './routes/ProtectedRoute';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
const App = () => {
    useEffect(() => {
        Store.dispatch(LoadUser());
        Store.dispatch(LoadSeller());
        Store.dispatch(LoadAdmin());
    });
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/sign-up' element={<SignUpPage/>}/>

                    <Route
                    path="/activation/:activation_token"
                    element={<ActivationPage />}
                    />


                    <Route path='/products' element={<ProductsPage/>}/>
                    <Route path='/product/:name' element={<ProductDetailPage/>}/>
                    <Route path='/best-selling' element={<BestSellingPage/>}/>
                    <Route path='/events' element={<EventsPage/>}/>
                    <Route path='/faq' element={<FAQPage/>}/>
                    <Route path='/career' element={<CareerPage/>}/>
                    <Route
                        path="/user/order/:id"
                        element={
                            <ProtectedRoute>
                                <OrderDetailsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <SellerProtectedRoute>
                                <ShopDashboardPage />
                            </SellerProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        );

}

export default App;
