import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:font-[60px] text-[#3d3a3a] font-[600] capitalize`}
                >
                    New Arrival For Hair <br /> 90% Human Hair
                </h1>
                <p className="pt-5 text-[16px] font-[Poppin] font[400] text-[#000000ba]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et,
                    architecto ab sequi facere error perspiciatis quis labore ducimus
                    inventore molestiae ut doloribus illo obcaecati officiis provident
                    reiciendis? Quaerat, mollitia numquam.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
            <span className="text-[rgb(255,255,255)] font-[Poppins] text-[18px] ">
              Order Now
            </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
