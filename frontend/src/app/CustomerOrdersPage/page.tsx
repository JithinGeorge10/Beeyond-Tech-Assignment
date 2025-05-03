'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCustomerOrdersDetail } from '@/lib/api/orders/orders';

interface Order {
    orderId: string;
    date: string;
    itemCount: number;
    total: number;
    status: string;
}

const ORDERS_PER_PAGE = 7;

function Page() {
    const router = useRouter();
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const token = localStorage.getItem('userAccessToken');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const res = await fetch('/api/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status !== 200) {
                    router.push('/login');
                    return;
                }

                const response = await fetchCustomerOrdersDetail();
                setOrderData(response.data.orderData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [router]);

    const totalPages = Math.ceil(orderData.length / ORDERS_PER_PAGE);
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const currentOrders = orderData.slice(startIndex, startIndex + ORDERS_PER_PAGE);

    const handlePrev = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
        );
    }
    const handleOrderView = (orderId: string) => {
        console.log("Clicked order ID:", orderId);
        router.push(`/SingleOrderPage?orderId=${orderId}`);
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <main className="flex-grow p-4 sm:p-6">
                    <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

                    <div className="bg-white shadow rounded-md overflow-hidden">
                        <div className="hidden md:grid grid-cols-6 text-sm font-semibold px-4 py-2 bg-gray-100 border-b">
                            <div>Order ID</div>
                            <div>Date</div>
                            <div>Items</div>
                            <div>Total</div>
                            <div>Status</div>
                            <div className="text-right">Action</div>
                        </div>

                        {currentOrders.length > 0 ? (
                            currentOrders.map((order, index) => (
                                <div key={index} className="grid md:grid-cols-6 gap-2 md:gap-0 px-4 py-3 text-sm ">
                                    <div className="md:hidden font-semibold">Order ID:</div>
                                    <div>{order.orderId}</div>

                                    <div className="md:hidden font-semibold">Date:</div>
                                    <div>{new Date(order.date).toLocaleDateString()}</div>

                                    <div className="md:hidden font-semibold">Items:</div>
                                    <div>{order.itemCount} items</div>

                                    <div className="md:hidden font-semibold">Total:</div>
                                    <div>${order.total.toFixed(2)}</div>

                                    <div className="md:hidden font-semibold">Status:</div>
                                    <div>
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="md:hidden font-semibold">Action:</div>
                                    <div className="text-right md:col-span-1">
                                        <button onClick={() => handleOrderView(order.orderId)} className="px-3 py-1 border rounded hover:bg-gray-100 w-full md:w-auto">View</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-4 text-sm text-gray-500">No orders found.</div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {orderData.length > ORDERS_PER_PAGE && (
                        <div className="flex justify-center items-center mt-6 gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    <div className="mt-6">
                        <button onClick={() => router.push('/ShopPage')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full sm:w-auto">
                            Continue Shopping
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Page;
