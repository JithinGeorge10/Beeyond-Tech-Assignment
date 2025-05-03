'use client'
import Footer from '@/components/Footer';
import { fetchActiveOrders, fetchDeliveredOrders, fetchUnassignedOrders, orderAccepted, orderDelivered } from '@/lib/api/orders/orders';
import React, { JSX, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { deliveryPartnerLogout } from '@/lib/api/auth/deliveryPartner';

type OrderItem = {
    productName: string;
    name: string;
    quantity: number;
};

type Order = {
    address: string;
    id: string;
    createdAt: string;
    status: string;
    items: OrderItem[];
};

type OrderType = 'available' | 'active' | 'completed';

const Page: React.FC = () => {
    const router = useRouter()

    const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [currentOrderType, setCurrentOrderType] = useState<OrderType>('available');

   const [isLoading, setIsLoading] = useState<boolean>(true);
   
       useEffect(() => {
           setIsLoading(true);
           (async () => {
               try {
                   const token = localStorage.getItem('deliveryPartnerAccessToken');
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
        const fetchOrders = async () => {
            if (currentOrderType === 'available') {
                const response = await fetchUnassignedOrders();
                setAvailableOrders(response.data.orderData);
            }

            if (currentOrderType === 'active' && activeOrders.length === 0) {
                const response = await fetchActiveOrders();
                setActiveOrders(response.data.orderData);
            }

            if (currentOrderType === 'completed' && activeOrders.length === 0) {
                const response = await fetchDeliveredOrders();
                setCompletedOrders(response.data.orderData);
            }
        };

        fetchOrders();
    }, [currentOrderType]);




    const acceptOrder = async (order: Order): Promise<void> => {

        const response = await orderAccepted(order.id);
        console.log(response);

        setAvailableOrders((prev) => prev.filter((o) => o.id !== order.id));
        setActiveOrders((prev) => [...prev, order]);
    };

    const markAsDelivered = async (order: Order): Promise<void> => {
        const response = await orderDelivered(order.id);
        console.log(response);
        setActiveOrders((prev) => prev.filter((o) => o.id !== order.id));
        setCompletedOrders((prev) => [...prev, order]);
    };
    const truncateTitle = (title: string) => {
        const words = title.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return title;
    };

    if (isLoading) {
        return (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        );
      }
    const renderOrders = (orders: Order[], type: OrderType): JSX.Element[] => {
        return orders.map((order) => (
            <div
                key={order.id}
                className={`w-full h-100 p-6 mb-4 rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] ${currentOrderType === type ? 'bg-white' : 'bg-gray-100'
                    }`}
            >
                <p className="mb-2"><span className="font-bold text-purple-700">Order ID:</span> {order.id}</p>
                <p className="mb-1"><span className="font-semibold">Status:</span> {order.status}</p>
                <p className="mb-1"><span className="font-semibold">Address:</span> {order.address}</p>
                <p className="mb-2"><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                <p className="mb-1"><span className="font-semibold">Products:</span></p>

                <ul className="list-disc list-inside mb-4">
                    {order.items.map((item, index) => (
                        <li key={index}>{truncateTitle(item.productName)} x {item.quantity}</li>
                    ))}
                </ul>
                {type === 'available' && (
                    <button
                        onClick={() => acceptOrder(order)}
                        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Accept Order
                    </button>
                )}
                {type === 'active' && (
                    <button
                        onClick={() => markAsDelivered(order)}
                        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Mark as Delivered
                    </button>
                )}
            </div>

        ));
    };
    const handleLogout = () => {
        (async () => {
            const response = await deliveryPartnerLogout()
            localStorage.removeItem('deliveryPartnerDetails');
            localStorage.removeItem('deliveryPartnerAccessToken');
            toast.success('Logged out successfully!');
            router.push('/Login')
        })()
    };
    return (
        <>
            <div className="min-h-screen bg-white text-black p-6">
                {/* Navbar with Title and Logout */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-500">Quick Commerce</h1>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                </div>

                {/* Order Category Buttons */}
                <div className="mb-6">
                    <button
                        onClick={() => setCurrentOrderType('available')}
                        className={`px-6 py-2 mr-4 rounded-lg ${currentOrderType === 'available' ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
                    >
                        Available Orders
                    </button>
                    <button
                        onClick={() => setCurrentOrderType('active')}
                        className={`px-6 py-2 mr-4 rounded-lg ${currentOrderType === 'active' ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
                    >
                        Active Orders
                    </button>
                    <button
                        onClick={() => setCurrentOrderType('completed')}
                        className={`px-6 py-2 rounded-lg ${currentOrderType === 'completed' ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
                    >
                        Completed Orders
                    </button>
                </div>

                {/* Render Orders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentOrderType === 'available' && renderOrders(availableOrders, 'available')}
                    {currentOrderType === 'active' && renderOrders(activeOrders, 'active')}
                    {currentOrderType === 'completed' && renderOrders(completedOrders, 'completed')}
                </div>
            </div>
            <Footer />
        </>
    );

};

export default Page;
