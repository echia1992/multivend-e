import React from 'react';
import Header from '../components/Layout/Header';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import BestDeals from '../components/BestDeals/BestDeals';
import Events from '../components/Route/Events/Events.jsx';
import FeaturedProduct from '../components/FeaturedProduct/FeaturedProduct';
import Partners from '../components/Partners/Partners';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
        return (
            <div>
                <Header activeHeading={1} />
                <Hero />
                <Categories />
                <BestDeals />
                <Events />
                <FeaturedProduct />
                <Partners />
                <Footer />
            </div>
        );
}

export default HomePage;