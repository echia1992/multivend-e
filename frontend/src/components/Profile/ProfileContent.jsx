/** @format */

import React , { useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from "react-icons/md";
import { AiOutlineArrowRight , AiOutlineCamera , AiOutlineDelete , } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const ProfileContent = ( { active } ) => {
    const { user } = useSelector ( ( state ) => state.user );
    const [ name , setName ] = useState ( user && user.name );
    const [ email , setEmail ] = useState ( user && user.email );
    const [ phoneNumber , setPhoneNumber ] = useState ();
    const [ zipCode , setZipCode ] = useState ();
    const [ address1 , setAddress1 ] = useState ( "" );
    const [ avatar, setAvatar ] = useState ( null );
    const [ address2 , setAddress2 ] = useState ( "" );

    const handlesSubmit = ( e ) => {
        e.preventDefault ();
    };

    return (
        <div className="w-full">
            { active === 1 && (
                <>
                    <div className="flex justify-center mt-[60px] 800px:w-full">
                        <div className="relative">
                            <div>
                                <img
                                    src={ `${ backend_url }${ user?.avatar }` }
                                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad123] cursor-pointer"
                                    alt=""
                                />
                            </div>
                            <div
                                className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                <AiOutlineCamera/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="w-full px-5">
                        <form onSubmit={ handlesSubmit } aria-required={ true }>
                            <div className="w-full 800px:flex block pb-3">
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-4  800px:mb-0` }
                                        required
                                        value={ name }
                                        onChange={ ( e ) => setName ( e.target.value ) }
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">Email Address</label>
                                    <input
                                        type="text"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-1 800px:mb-0` }
                                        required
                                        value={ email }
                                        onChange={ ( e ) => setEmail ( e.target.value ) }
                                    />
                                </div>
                            </div>
                            <div className="w-full 800px:flex block pb-3">
                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Phone Number</label>
                                    <input
                                        type="number"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-4  800px:mb-0` }
                                        required
                                        value={ phoneNumber }
                                        onChange={ ( e ) => setPhoneNumber ( e.target.value ) }
                                    />
                                </div>
                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Zip Code</label>
                                    <input
                                        type="number"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-4  800px:mb-0` }
                                        required
                                        value={ zipCode }
                                        onChange={ ( e ) => setZipCode ( e.target.value ) }
                                    />
                                </div>
                            </div>
                            <div className="w-full 800px:flex block pb-3">
                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Address 1</label>
                                    <input
                                        type="text"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-4  800px:mb-0` }
                                        required
                                        value={ address1 }
                                        onChange={ ( e ) => setAddress1 ( e.target.value ) }
                                    />
                                </div>
                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2">Address 2</label>
                                    <input
                                        type="text"
                                        className={ `${ styles.input } !w-[70%] 800px:!w-[95%] mb-4  800px:mb-0` }
                                        required
                                        value={ address2 }
                                        onChange={ ( e ) => setAddress2 ( e.target.value ) }
                                    />
                                </div>
                            </div>
                            <input
                                className={ `w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer` }
                                required
                                value="Update"
                                type="submit"
                            />
                        </form>
                    </div>
                </>
            ) }

            { active === 2 && (
                <div>
                    <AllOrders/>
                </div>
            ) }
            { active === 3 && (
                <div>
                    <RefundsOrders/>
                </div>
            ) }

            { active === 5 && (
                <div>
                    <TrackOrder/>
                </div>
            ) }
            { active === 6 && (
                <div>
                    <PaymentMethod/>
                </div>
            ) }

            { active === 7 && (
                <div>
                    <Address/>
                </div>
            ) }
        </div>
    );
};

const AllOrders = () => {
    const orders = [
        {
            _id : "#57768487739374" ,
            orderItems : [
                {
                    name : "Iphone 14 Pro Max " ,
                } ,
            ] ,
            totalPrice : 500000 ,
            orderStatus : "Processing" ,
        } ,
    ];
    const columns = [
        { field : "id" , headerName : "Order ID" , minWidth : 150 , flex : 0.7 } ,

        {
            field : "status" ,
            headerName : "Status" ,
            minWidth : 130 ,
            flex : 0.7 ,
            cellClassName : ( params ) => {
                return params.getValue ( params.id , "status" ) === "Delivered"
                    ? "greenColor"
                    : "redColor";
            } ,
        } ,
        {
            field : "itemsQty" ,
            headerName : "Items Qty" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.7 ,
        } ,
        {
            field : "total" ,
            headerName : "Total" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.8 ,
        } ,
        {
            field : " " ,
            flex : 1 ,
            minWidth : 150 ,
            headerName : "" ,
            type : "number" ,
            sortable : false ,
            renderCell : ( params ) => {
                return (
                    <>
                        <Link to={ `/user/order/${ params.id }` }>
                            <Button>
                                <AiOutlineArrowRight size={ 20 }/>
                            </Button>
                        </Link>
                    </>
                );
            } ,
        } ,
    ];

    const row = [];

    orders &&
    orders.forEach ( ( item ) => {
        row.push ( {
            id : item._id ,
            itemsQty : item.orderItems.length ,
            total : "NGN ₦ " + item.totalPrice ,
            status : item.orderStatus ,
        } );
    } );
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={ row }
                columns={ columns }
                pageSize={ 10 }
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};
const RefundsOrders = () => {
    const orders = [
        {
            _id : "#57768487739374" ,
            orderItems : [
                {
                    name : "Iphone 14 Pro Max " ,
                } ,
            ] ,
            totalPrice : 500000 ,
            orderStatus : "Processing" ,
        } ,
    ];
    const columns = [
        { field : "id" , headerName : "Order ID" , minWidth : 150 , flex : 0.7 } ,

        {
            field : "status" ,
            headerName : "Status" ,
            minWidth : 130 ,
            flex : 0.7 ,
            cellClassName : ( params ) => {
                return params.getValue ( params.id , "status" ) === "Delivered"
                    ? "greenColor"
                    : "redColor";
            } ,
        } ,
        {
            field : "itemsQty" ,
            headerName : "Items Qty" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.7 ,
        } ,
        {
            field : "total" ,
            headerName : "Total" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.8 ,
        } ,
        {
            field : " " ,
            flex : 1 ,
            minWidth : 150 ,
            headerName : "" ,
            type : "number" ,
            sortable : false ,
            renderCell : ( params ) => {
                return (
                    <>
                        <Link to={ `/user/order/${ params.id }` }>
                            <Button>
                                <AiOutlineArrowRight size={ 20 }/>
                            </Button>
                        </Link>
                    </>
                );
            } ,
        } ,
    ];

    const row = [];

    orders &&
    orders.forEach ( ( item ) => {
        row.push ( {
            id : item._id ,
            itemsQty : item.orderItems.length ,
            total : "NGN ₦ " + item.totalPrice ,
            status : item.orderStatus ,
        } );
    } );
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={ row }
                columns={ columns }
                pageSize={ 10 }
                autoHeight
                disableSelectionOnclick
            />
        </div>
    );
};

const TrackOrder = () => {
    const orders = [
        {
            _id : "#57768487739374" ,
            orderItems : [
                {
                    name : "Iphone 14 Pro Max " ,
                } ,
            ] ,
            totalPrice : 500000 ,
            orderStatus : "Processing" ,
        } ,
    ];
    const columns = [
        { field : "id" , headerName : "Order ID" , minWidth : 150 , flex : 0.7 } ,

        {
            field : "status" ,
            headerName : "Status" ,
            minWidth : 130 ,
            flex : 0.7 ,
            cellClassName : ( params ) => {
                return params.getValue ( params.id , "status" ) === "Delivered"
                    ? "greenColor"
                    : "redColor";
            } ,
        } ,
        {
            field : "itemsQty" ,
            headerName : "Items Qty" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.7 ,
        } ,
        {
            field : "total" ,
            headerName : "Total" ,
            type : "number" ,
            minWidth : 130 ,
            flex : 0.8 ,
        } ,
        {
            field : " " ,
            flex : 1 ,
            minWidth : 150 ,
            headerName : "" ,
            type : "number" ,
            sortable : true ,
            renderCell : ( params ) => {
                return (
                    <>
                        <Link to={ `/user/track/order/${ params.id }` }>
                            <Button>
                                <MdTrackChanges size={ 20 }/>
                            </Button>
                        </Link>
                    </>
                );
            } ,
        } ,
    ];

    const row = [];

    orders &&
    orders.forEach ( ( item ) => {
        row.push ( {
            id : item._id ,
            itemsQty : item.orderItems.length ,
            total : "NGN ₦ " + item.totalPrice ,
            status : item.orderStatus ,
        } );
    } );
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={ row }
                columns={ columns }
                pageSize={ 10 }
                autoHeight
                disableSelectionOnclick
            />
        </div>
    );
};

const PaymentMethod = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    Payment Method
                </h1>
                <div className={ `${ styles.button } !rounded-md` }>
                    <span className="text-[#fff]"> Add New</span>
                </div>
            </div>
            <br/>
            <div
                className="w-full bg-whit h-[70px] !rounded-[4px] flex items-center px-3 shadow justify-between pr-10 ">
                <div className="flex !items-start">
                    <img src="/visa-card.png" alt=""/>
                    <h5 className="pl-5 font-[600]"> Anthony Echia</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>123 **** *** **** </h6>
                    <h5 className=" pl-6"> 08/1/2023</h5>
                </div>
                <div className="mini-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={ 25 } className="cursor-pointer "/>
                </div>
            </div>
        </div>
    );
};

const Address = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    My Addresses
                </h1>
                <div className={ `${ styles.button } !rounded-md` }>
                    <span className="text-[#fff]"> Add New</span>
                </div>
            </div>
            <br/>
            <div
                className="w-full bg-whit h-[70px] !rounded-[4px] flex items-center px-3 shadow justify-between pr-10 ">
                <div className="flex !items-start">
                    <h5 className="pl-5 font-[600]"> Default Address</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6> 17, Gra Street Niger</h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>Phone (+234) 816 745 384</h6>
                </div>
                <div className="mini-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={ 25 } className="cursor-pointer "/>
                </div>
            </div>
        </div>
    );
};
export default ProfileContent;