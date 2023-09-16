import React, {useEffect, useState} from 'react';
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import {productData} from "../statics/data";
import {useSearchParams} from "react-router-dom";
import ProductCard from '../components/Route/ProductCard/ProductCard'
import Footer from "../components/Footer/Footer";

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const [data, setData] = useState([]);
    useEffect(() => {
        if (categoryData === null) {
            const d =
                productData && productData.sort((a, b) => a.total_sell - b.total_sell);
            setData(d);
        } else {
            const d =
                productData && productData.filter((i) => i.category === categoryData);
            setData(d);
        }
        // window.scrollTo(0,0)
    }, [categoryData]);
        return (
            <div>
                <Header activeHeading={3} />
                <br/>
                <br/>
                <br/>
                    <div className={`${styles.section}`}>
                           <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                           </div>
                        {
                            data && data.length === 0 ? (
                                <div
                                className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 text-center w-full pb-[110px] mb-6'
                                role='alert'
                                >
                                    <h1 className='font-bold text-[20px]'>
                                        Op! No Products Found
                                    </h1>
                                    <p>Please Check Next Category</p>
                                </div>
                            ) :
                                null
                        }
                    </div>
                <Footer/>
            </div>
        );

}

export default ProductsPage;