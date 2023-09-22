import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import {BiMenuAltLeft} from "react-icons/bi";
import {AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart} from "react-icons/ai";
import styles from "../../styles/styles";
import {CgProfile} from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";
import WishList from "../wishList/WishList";
import {RxCross1} from "react-icons/rx";
import {categoriesData, productData} from "../../statics/data";
import {useSelector} from "react-redux";
import {backend_url} from "../../server";

const Header = ({activeHeading}) => {
    const { isAuthenticated , user } = useSelector ( ( state ) => state.user );
    const [ searchTerm , setSearchTerm ] = useState ( "" );
    const [ searchData , setSearchData ] = useState ( null );
    const [ active , setActive ] = useState ( false );
    const [ dropDown , setDropDown ] = useState ( false );
    const [ openCart , setOpenCart ] = useState ( false );
    const [ open , setOpen ] = useState ( false );
    const [ openWishList , setOpenWishList ] = useState ( false );

    const handleSearchChange = ( e ) => {
        const term = e.target.value;
        setSearchTerm ( term );

        const filteredProducts =
            productData &&
            productData.filter ( ( product ) =>
                product.name.toLocaleLowerCase ().includes ( term.toLowerCase () )
            );
        setSearchData ( filteredProducts );
    };
    window.addEventListener ( "scroll" , () => {
        if ( window.scrollY > 70 ) {
            setActive ( true );
        } else {
            setActive ( false );
        }
    } );

        return (
            <>
                <div className={ `${ styles.section }` }>
                    <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
                        <div>
                            <Link to="/">
                                <img src="/handc-logo.png" alt=""/>
                            </Link>
                        </div>
                        {/*search bar*/ }
                        <div className="w-[50%] relative">
                            <input
                                type="search"
                                placeholder="Search Product....."
                                value={ searchTerm }
                                onChange={ handleSearchChange }
                                className="h-[40px] w-full p-2 border-[#0b6913] border-[2px] rounded-md"
                            />
                            <AiOutlineSearch
                                size={ 30 }
                                className="absolute right-2 top-1.5 cursor-pointer"
                            />
                            { searchData && searchData.length !== 0 ? (
                                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                    { searchData &&
                                        searchData.map ( ( i , index ) => {
                                            const d = i.name;

                                            const Product_name = d.replace ( /\s+/g , "-" );
                                            return (
                                                <Link to={ `/product/${ Product_name }` }>
                                                    <div className="w-full flex items-start-py-3">
                                                        <img
                                                            src={ i.image_Url[ 0 ].url }
                                                            alt=""
                                                            className="w-[40px] h-[40px] mr-[10px]"
                                                        />
                                                        <h1>{ i.name }</h1>
                                                    </div>
                                                </Link>
                                            );
                                        } ) }
                                </div>
                            ) : null }
                        </div>

                        <div className={ `${ styles.button }` }>
                            <Link to="/shop-create">
                                <h1 className="text-[#fff] flex items-center">
                                    Become Seller
                                    <IoIosArrowForward className="ml-1"/>
                                </h1>
                            </Link>
                        </div>

                    </div>
                </div>
                <div
                    className={ `${
                        active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    } transition hidden 800px:flex place-items-center justify-between w-full bg-[#368e0dea] h-[70px]` }
                >
                    <div
                        className={ `${ styles.section } relative ${ styles.normalFlex } justify-between` }
                    >
                        {/*Category item search*/ }
                        <div onClick={ () => setDropDown ( ! dropDown ) }>
                            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                                <BiMenuAltLeft size={ 30 } className="absolute top-3 left-2"/>
                                <button
                                    className={ `h-[90%] w-full flex items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md ` }
                                >
                                    All Categories
                                </button>
                                <IoIosArrowDown
                                    size={ 20 }
                                    className="absolute right-2 top-4 cursor-pointer"
                                    onClick={ () => setDropDown ( ! dropDown ) }
                                />
                                { dropDown ? (
                                    <DropDown
                                        categoriesData={ categoriesData }
                                        setDropDown={ setDropDown }
                                    />
                                ) : null }
                            </div>
                        </div>
                        {/*Navi item */ }
                        <div className={ `${ styles.normalFlex }` }>
                            <Navbar active={ activeHeading }/>
                        </div>

                        <div className="flex">
                            <div className={ `${ styles.normalFlex }` }>
                                <div
                                    className="relative cursor-pointer mr-[15px]"
                                    onClick={ () => setOpenWishList ( true ) }
                                >
                                    <AiOutlineHeart size={ 30 } color="rgb(255 255 255 /83%)"/>
                                    <span
                                        className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
                                </div>
                            </div>
                            <div className={ `${ styles.normalFlex }` }>
                                <div
                                    className="relative cursor-pointer mr-[15px]"
                                    onClick={ () => setOpenCart ( true ) }
                                >
                                    <AiOutlineShoppingCart
                                        size={ 30 }
                                        color="rgb(255 255 255 /83%)"
                                    />
                                    <span
                                        className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
                                </div>
                            </div>
                            <div className={ `${ styles.normalFlex }` }>
                                <div className="relative cursor-pointer mr-[15px]">
                                    { isAuthenticated ? (
                                        <Link to="/profile">
                                            <img
                                                 src={ `${ backend_url }${ user?.avatar }` }
                                                className="w-[50px] h-[50px] border-[3px] border-[#2736de] rounded-full"
                                                alt=""
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <CgProfile size={ 30 } color="rgb(255 255 255 /83%)"/>
                                        </Link>
                                    ) }
                                </div>
                            </div>

                            {/* cart popup*/ }
                            { openCart ? <Cart setOpenCart={ setOpenCart }/> : null }

                            {/* wishList popup*/ }
                            { openWishList ? (
                                <WishList setOpenWishList={ setOpenWishList }/>
                            ) : null }
                        </div>
                    </div>
                </div>
                <div
                    className={ `${
                        active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    } w-full h-[75px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden` }
                >
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <BiMenuAltLeft
                                size={ 70 }
                                className="ml-4"
                                onClick={ () => setOpen ( true ) }
                            />
                        </div>
                        <div>
                            <Link to="/">
                                <img
                                    src="/handc-logo.png"
                                    sizes={ 20 }
                                    className="mt-1 cursor-pointer p"
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div>
                            <div className="relative mr-[20px]">
                                <AiOutlineShoppingCart size={ 30 }/>
                                <span
                                    className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                1
              </span>
                            </div>
                        </div>
                    </div>

                    {/*side header sidebar mobile screen */ }

                    { open ? (
                        <div className=" w-full fixed bg-[#0000005f] z-20 h-full top-0 left-0">
                            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10  !overflow-y-scroll">
                                <div className="w-full justify-between flex pr-3">
                                    <div>
                                        <div className="relative mr-[15px]">
                                            <AiOutlineHeart size={ 30 } className="mt-5 ml-3"/>
                                            <span
                                                className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                                        </div>
                                    </div>
                                    <RxCross1
                                        size={ 30 }
                                        className="ml-4 mt-5"
                                        onClick={ () => setOpen ( false ) }
                                    />
                                </div>

                                <div className="my-8 w-[92%] m-auto h-[40px] relative">
                                    <input
                                        type="search"
                                        placeholder="Search Product....."
                                        value={ searchTerm }
                                        onChange={ handleSearchChange }
                                        className="h-[40px] w-full p-2 border-[#0b6913] border-[2px] rounded-md"
                                    />
                                    <AiOutlineSearch
                                        size={ 20 }
                                        className="absolute right-2 top-1.5 cursor-pointer"
                                    />
                                    { searchData && searchData.length !== 0 ? (
                                        <div className="absolute  bg-[#fff] z-10 shadow w-full  p-3">
                                            { searchData &&
                                                searchData.map ( ( i , index ) => {
                                                    const d = i.name;

                                                    const Product_name = d.replace ( /\s+/g , "-" );
                                                    return (
                                                        <Link to={ `/product/${ Product_name }` }>
                                                            <div className="flex items-center">
                                                                <img
                                                                    src={ i.image_Url[ 0 ].url }
                                                                    alt=""
                                                                    className="w-[50px] mr-2"
                                                                />
                                                                <h5>{ i.name }</h5>
                                                            </div>
                                                        </Link>
                                                    );
                                                } ) }
                                        </div>
                                    ) : null }
                                </div>

                                <Navbar active={ activeHeading }/>
                                <div className={ `${ styles.button } ml-4 !rounded-[4px]` }>
                                    <Link to="/shop-create">
                                        <h1 className="text-[#fff] flex items-center">
                                            Become Seller
                                            <IoIosArrowForward className="ml-1"/>
                                        </h1>
                                    </Link>
                                </div>
                                <br/>
                                <div className="flex w-full justify-center">
                                    { isAuthenticated ? (
                                        <div>
                                            <Link to="/profile">
                                                <img
                                                     src={`${backend_url}${user?.avatar}`}
                                                    className="w-[50px] h-[50px] border-[3px] border-[#2736de] rounded-full"
                                                    alt=""
                                                />

                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="text-[18px] pr-[10px] text-[#3a4bd1]"
                                            >
                                                Login /
                                            </Link>
                                            <Link to="/sign-up" className="text-[18px]  text-[#3a4bd1]">
                                                Sign Up
                                            </Link>

                                        </>
                                    ) }
                                </div>
                            </div>
                        </div>
                    ) : null }
                </div>


            </>
        );

}

export default Header;