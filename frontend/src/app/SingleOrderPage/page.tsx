'use client'
import { useSearchParams } from 'next/navigation'
import { FaUser, FaPhone, FaHome } from "react-icons/fa";
import React, { useEffect, useState, Suspense } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types/user';
import { fetchSingleOrderDetails } from '@/lib/api/orders/orders';
import { ApiResponse } from '@/lib/types/products';
import { fetchProductsAPI } from '@/lib/api/products/products';

const OrderPageContent = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const [orderData, setOrderData] = useState<any | null>(null);
    const [orderedProducts, setOrderedProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        try {
            (async () => {
                const token = localStorage.getItem('userAccessToken');
                if (!token) {
                    router.push('/Login');
                    return;
                }

                const res = await fetch('/api/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status !== 200) {
                    router.push('/Login');
                    return;
                }

                const storedUserDetails = localStorage.getItem('customerDetails');
                if (storedUserDetails) {
                    setUserDetails(JSON.parse(storedUserDetails));
                }

                const response = await fetchSingleOrderDetails(orderId);
                console.log(response.data.orderData.items);
                setOrderData(response.data.orderData);
                const order = response.data.orderData;


                const fakeAPI = await fetchProductsAPI()
                if (!response) throw new Error('Failed to fetch products');


                console.log(fakeAPI.products);
                const itemsWithDetails = order.items.map((item: any) => {
                    const product = fakeAPI.products.find(p => p.id == item.productId);
                    return {
                        ...item,
                        ...product,
                    };
                });

                setOrderedProducts(itemsWithDetails);


            })()
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }, [orderId, router]);
    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
        );
    }
    const truncateTitle = (title: string) => {
        const words = title.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return title;
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen text-black bg-gray-50 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <button onClick={() => router.push('/CustomerOrdersPage')} className="text-sm text-blue-600 hover:underline">
                            ← Back to Orders
                        </button>
                        <div className="text-lg text-black font-bold">
                            Order ID: {orderId}
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {orderData?.status}
                            </span>
                        </div>
                    </div>

                    {/* Order Status */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Order Status</h2>
                        <div className="flex text-black justify-between items-center">
                            {["pickup", "ontheway", "delivered"].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${["pickup", "ontheway", "delivered"].indexOf(orderData?.status) >= idx
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-300"
                                            }`}
                                    >
                                        {idx + 1}
                                    </div>
                                    <p className="text-xs text-center mt-2">
                                        {step === "pickup" ? "Picked up" : step === "ontheway" ? "On the Way" : "Delivered"}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Order Info */}
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold ">Order Information</h3>
                            <p className="text-sm">
                                Order Date: {new Date(orderData?.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Customer Information</h3>
                            <p className="text-sm flex items-center gap-2">
                                <FaUser /> {userDetails?.data?.fullName}
                            </p>
                            <p className="text-sm flex items-center gap-2">
                                <FaPhone /> {userDetails?.data?.phoneNumber}
                            </p>
                            <p className="text-sm flex items-center gap-2">
                                <FaHome /> {userDetails?.data?.deliveryAddress}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className='text-black'>
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
                                    <p className="text-sm text-gray-500 mt-2">Loading products...</p>
                                </div>
                            ) : (
                                orderedProducts.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image || '/placeholder.png'}
                                                alt={item.title || 'Product'}
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {truncateTitle(item.title || 'Untitled Product')}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ₹{item.price} × {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-sm">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            )}

                            <div className="text-right space-y-1 pt-4">
                                <p className="font-semibold">Total: ₹{orderData?.total}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Footer></Footer>
            </div>
        </>
    );
};
const OrderPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderPageContent />
        </Suspense>
    );
};
export default OrderPage;











