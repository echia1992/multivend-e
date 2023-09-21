import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {
    HomePage,
    ProductsPage,
    ProductDetailPage,
    BestSellingPage,
    EventsPage,
    FAQPage,
    CareerPage,
    SignUpPage,
    LoginPage
} from './routes/Routes.js'

const App = () => {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/sign-up' element={<SignUpPage/>}/>


                    <Route path='/products' element={<ProductsPage/>}/>
                    <Route path='/product/:name' element={<ProductDetailPage/>}/>
                    <Route path='/best-selling' element={<BestSellingPage/>}/>
                    <Route path='/events' element={<EventsPage/>}/>
                    <Route path='/faq' element={<FAQPage/>}/>
                    <Route path='/career' element={<CareerPage/>}/>

                </Routes>
            </BrowserRouter>
        );

}

export default App;
