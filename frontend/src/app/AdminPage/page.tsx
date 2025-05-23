'use client';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { fetchAllDeliveryPartners, fetchAllOrders } from '@/lib/api/admin/admin';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { adminLogout } from '@/lib/api/auth/admin';

type Order = {
    _id: any;
    orderId: string;
    date: string;
    itemCount: number;
    total: number;
    status: string;
    deliveryPartner: string;
    address: string;
};

type Partner = {
    phoneNumber: string;
    fullName: string;
    name: string;
    email: string;
    phone: string;
};

const Page = () => {
    const router = useRouter()
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [view, setView] = useState('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const token = localStorage.getItem('adminAccessToken');
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

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [router]);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (view === 'orders') {
                    const response = await fetchAllOrders()
                    console.log(response);

                    setOrders(response.data.orderData)
                } else {
                    const response = await fetchAllDeliveryPartners()
                    setPartners(response.data.orderData)
                }


            } catch (error) {
                console.error('Fetch failed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    const handleLogout = () => {
        (async () => {
            const response = await adminLogout()
            localStorage.removeItem('adminDetails');
            localStorage.removeItem('adminAccessToken');
            toast.success('Logged out successfully!');
            router.push('/Login')
        })()
    };
    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-white text-black flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-purple-700 px-6 py-4 flex justify-between items-center shadow-lg">
                <div className="text-xl text-white font-bold">Quick Commerce</div>
                <button onClick={handleLogout} className="bg-red-300 text-black px-4 py-2 rounded hover:bg-red-600 hover:text-black transition duration-300">
                    Logout
                </button>
            </nav>

            {/* Main content */}
            <main className="flex-grow">
                {/* Toggle buttons */}
                <div className="flex justify-center gap-4 my-8">
                    <button
                        onClick={() => setView('orders')}
                        className={`px-6 py-2 rounded-full border-2 ${view === 'orders'
                            ? 'bg-purple-700 border-purple-700 text-white'
                            : 'bg-white text-black border-purple-700'
                            } hover:opacity-90 transition duration-300`}
                    >
                        All Orders
                    </button>
                    <button
                        onClick={() => setView('partners')}
                        className={`px-6 py-2 rounded-full border-2 ${view === 'partners'
                            ? 'bg-purple-700 border-purple-700 text-white'
                            : 'bg-white text-black border-purple-700'
                            } hover:opacity-90 transition duration-300`}
                    >
                        All Delivery Partners
                    </button>
                </div>

                {/* Table */}
                <div className="w-[95%] md:w-4/5 mx-auto  rounded-xl overflow-hidden shadow-lg mb-8">
                    <table className="w-full text-left">
                        <thead className="bg-purple-700 text-white text-sm md:text-base">
                            {view === 'orders' ? (
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Item Count</th>
                                    <th className="px-4 py-3">Total</th>
                                    <th className="px-4 py-3">Live Status</th>
                                    <th className="px-4 py-3">Partner</th>
                                    <th className="px-4 py-3">Address</th>
                                    <th className="px-4 py-3">View</th>

                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Phone</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="text-sm md:text-base">
                            {view === 'orders'
                                ? currentOrders.map((order, idx) => (
                                    <tr key={idx} className="transition duration-200">
                                        <td className="px-4 py-3">{order.orderId}</td>
                                        <td className="px-4 py-3">
                                            {new Date(order.date).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="px-4 py-3">{order.itemCount}</td>
                                        <td className="px-4 py-3">{order.total}</td>
                                        <td className="px-4 py-3">{order.status}</td>
                                        <td className="px-4 py-3">{order.deliveryPartner}</td>
                                        <td className="px-4 py-3">{order.address}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-blue-600 hover:underline"
                                                type="button"
                                            >
                                                View
                                            </button>

                                        </td>
                                    </tr>
                                ))
                                : partners.map((partner, idx) => (
                                    <tr key={idx} className="transition duration-200">
                                        <td className="px-4 py-3">{partner.fullName}</td>
                                        <td className="px-4 py-3">{partner.email}</td>
                                        <td className="px-4 py-3">{partner.phoneNumber}</td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                    <div className="flex justify-center gap-2 my-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded border ${currentPage === i + 1
                                    ? 'bg-purple-700 text-white'
                                    : 'bg-white text-black border-purple-700'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                </div>
            </main>
            {selectedOrder && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                    <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString("en-GB")}</p>
                    <p><strong>Item Count:</strong> {selectedOrder.itemCount}</p>
                    <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Delivery Partner:</strong> {selectedOrder.deliveryPartner}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                </Modal>
            )}

            {/* Footer always at bottom */}
            <Footer />
        </div>
    );
};

export default Page;
