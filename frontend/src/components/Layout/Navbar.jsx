import React from 'react';
import {navItems} from "../../statics/data";
import styles from "../../styles/styles";
import {Link} from "react-router-dom";

const Navbar = ({active}) => {

        return (
            <div className={`block 800px:${styles.normalFlex}`}>
                {navItems &&
                    navItems.map((i, index) => (
                        <div className="flex">
                            <Link
                                to={i.url}
                                className={`${
                                    active === index + 1
                                        ? "text-[#c3dd17]"
                                        : "text-black 800px:text-[#fff]"
                                } pb-[30px] font-[500] 800px:pb-0 px-6 800px:cursor-pointer}`}
                            >
                                {i.title}
                            </Link>
                        </div>
                    ))}
            </div>
        );

}

export default Navbar;