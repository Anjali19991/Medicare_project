import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
} from "../../features/MedicineSlice";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.medicines.items);
    
    const handleIncreaseQuantity = (item) => {

        dispatch(increaseQuantity(item));
        toast.info("Increased Items",{autoClose:1500})
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item));
        toast.warning("Decreased Items",{autoClose:1500})
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast.error("Removed Item From Cart", { autoClose: 2000 });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const calculateTotal = (cartItems) => {
        return cartItems.reduce(
            (total, item) => total + parseFloat(item.MRP) * item.quantity,
            0
        );
    };

    return (
        <>
            <div className="my-12 px-4">
                <h1 className="text-2xl my-4 text-center">Your Cart</h1>
                <div className={`flex justify-between max-[1100px]:flex-wrap mt-4 ${cartItems.length === 0 ? 'min-h-[75vh] items-center' : ''}`}>
                    <div className="w-full flex flex-col items-center justify-center px-4">
                        {cartItems.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Item</th>
                                        <th className="py-2">Quantity</th>
                                        <th className="py-2">Price</th>
                                        <th className="py-2">Remove Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="border-b text-center">
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2">
                                                <div className="flex gap-2 items-center justify-center">
                                                    <button className="text-2xl text-white px-2 rounded-sm bg-red-600" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                                    <span className="">{item.quantity}</span>
                                                    <button className="text-2xl text-white px-[0.36rem] rounded-sm bg-green-600" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                                </div>
                                            </td>
                                            <td className="py-2">₹{item.MRP * item.quantity}</td>
                                            <td className="py-2">
                                                <button onClick={() => handleRemoveItem(item)} className="text-2xl p-1 rounded-sm bg-red-600"><MdDeleteOutline className="text-white" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        ) : (
                            <p className="text-2xl mb-4">Your cart is empty</p>
                        )}
                        <div className="flex items-center gap-4">
                            <Link to={"/buymedicines"} className="px-4 py-2 text-white rounded-md bg-teal-500">Continue Shopping</Link>
                            {
                                cartItems.length > 0 ? (
                                    <button
                                        onClick={handleClearCart}
                                        className="bg-red-500 text-white my-8 py-2 px-4 rounded-md"
                                    >
                                        Clear Cart
                                    </button>
                                ) : ("")
                            }
                        </div>
                    </div>
                    {
                        cartItems.length !== 0 ? (
                            <div className="max-[1100px]:w-full w-1/2 text-center">
                                <div className="border p-4 mb-4">
                                    <h3 className="text-center text-lg font-bold mb-2">Your Bill</h3>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex justify-between my-2">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>₹{item.MRP * item.quantity}</span>
                                        </div>
                                    ))}
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>₹{calculateTotal(cartItems).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-teal-800 text-white mx-auto rounded-md">Proceed To Buy</button>
                            </div>
                        ) : (
                            ""
                        )
                    }


                </div>
            </div>
        </>
    );
};

export default CartPage;
