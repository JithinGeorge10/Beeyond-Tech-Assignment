'use client'
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { User } from '@/lib/types/user';
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const router = useRouter();

    const { cart, updateQuantity, clearCart, removeFromCart } = useCart();
    const [userDetails, setUserDetails] = useState<User | null>(null);

    useEffect(() => {
        const checkAuthAndLoadUser = async () => {

            const token = localStorage.getItem('userAccessToken'); // assuming token is stored here
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
                router.push('/login');
                return;
            }

            const storedUserDetails = localStorage.getItem('customerDetails');
            if (storedUserDetails) {
                setUserDetails(JSON.parse(storedUserDetails));
            }
        };

        checkAuthAndLoadUser();
    }, [router]);

    const subtotal = cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
    const total = subtotal;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">
                <h1 className="text-3xl text-black font-bold mb-6">Your Cart</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Cart Items */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl text-black font-semibold mb-4">Cart Items</h2>
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
                                    <div>
                                        <p className="font-semibold text-black">{item.title}</p>
                                        <p className="text-black">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex text-black items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="text-black">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                    <p className="ml-4 text-black font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-4 px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={clearCart}
                            className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl text-black font-semibold mb-4">Order Summary</h2>
                        <div className="mb-4 text-black space-y-2">
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Ensure inputs are controlled */}
                        <input
                            type="text"
                            value={userDetails?.data?.fullName || ''}
                            className="w-full text-black mt-2 p-2 border rounded"
                            readOnly
                        />

                        <input
                            type="tel"
                            value={userDetails?.data?.phoneNumber || ''}
                            className="w-full text-black mt-2 p-2 border rounded"
                            readOnly
                        />

                        <textarea
                            value={userDetails?.data?.deliveryAddress || ''}
                            className="w-full text-black mt-2 p-2 border rounded"
                            readOnly
                        />
                        <button className="w-full mt-4 p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
