import React, {useState} from 'react';
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar
} from "react-icons/ai";
import {Link} from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard.jsx'

const ProductCard =({data})=>{
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const d = data.name;
    const product_name = d.replace(/\s+/g, "-");
        return (
            <>
                <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
                    <div className="flex justify-end"></div>
                    <Link to={`/product/${product_name}`}>
                        <img
                            src={data.image_Url[0].url}
                            alt="data.name"
                            className="w-full h-[170px] object-contain hover:animate-spin transition duration-8000"
                        />
                    </Link>
                    <Link to="/">
                        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                    </Link>
                    <Link to={`/product/${product_name}`}>
                        <h4 className="pb-3 font-[500]">
                            {data.name.length > 40 ? data.name.slice(0, 40) + "-" : data.name}
                        </h4>

                        <div className="flex">
                            <AiFillStar
                                className="mr-2 cursor-pointer"
                                color="green"
                                size={20}
                            />
                            <AiFillStar
                                className="mr-2 cursor-pointer"
                                color="green"
                                size={20}
                            />
                            <AiFillStar
                                className="mr-2 cursor-pointer"
                                color="green"
                                size={20}
                            />
                            <AiFillStar
                                className="mr-2 cursor-pointer"
                                color="green"
                                size={20}
                            />
                            <AiOutlineStar
                                className="mr-2 cursor-pointer"
                                color="green"
                                size={20}
                            />
                        </div>

                        <div className="py-2 flex items-center justify-between">
                            <div className="flex">
                                <h5 className={`${styles.productDiscountPrice}`}>
                                    ₦ {data.price === 0 ? data.Price : data.discount_price}
                                </h5>

                                <h4 className={`${styles.price}`}>
                                    {data.price ? data.price + "  " : null}
                                </h4>
                            </div>

                            <span className="font-[200] text-[10px] bg-[#04A546] text-[#fff] cursor-pointer left-2 absolute top-4">
              {data.price
                  ? Math.floor(
                  ((data.discount_price - data.price) / data.price) * 100
              ) + "%"
                  : null}
            </span>
                            <span className="font-[400] text-[15px] text-[#4177ed]">
              {data.total_sell} Sold
            </span>
                        </div>
                    </Link>
                    {/*side options */}
                    <div>
                        {click ? (
                            <AiFillHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5"
                                onClick={() => setClick(!click)}
                                color={click ? "red" : "#333"}
                                title="Remove from wishlist"
                            />
                        ) : (
                            <AiOutlineHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5"
                                onClick={() => setClick(!click)}
                                color={click ? "red" : "#333"}
                                title="Add to wishlist"
                            />
                        )}
                        <AiOutlineEye
                            size={22}
                            className="cursor-pointer absolute right-2 top-14"
                            onClick={() => setOpen(!open)}
                            color="#333"
                            title="Quick View"
                        />
                        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                        <AiOutlineShoppingCart
                            size={25}
                            className="cursor-pointer absolute right-2 top-20"
                            onClick={() => setOpen(!open)}
                            color="#444"
                            title="Add To Cart"
                        />
                    </div>
                </div>
            </>
        );

}

export default ProductCard;