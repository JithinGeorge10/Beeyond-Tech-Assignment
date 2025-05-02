import { useCart } from '@/context/CartContext';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter()

    const [userDetails, setUserDetails] = useState<User | null>(null); // State to store user details
    const { totalItems } = useCart();

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('customerDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
    }, []);

    return (
        <div>
            <nav className="bg-purple-50 border-b border-purple-100 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black">Quick Commerce</h1>
                    <div className="flex gap-4 items-center">
                        {userDetails ? (
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <FaShoppingCart className="text-purple-600" size={20} />
                                    {totalItems > 0 && (
                                        <span className="text-xs font-semibold text-white bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <span className="text-black font-semibold">
                                    Welcome, {userDetails.data.fullName}
                                </span>
                                <FiLogOut
                                    className="text-2xl cursor-pointer text-black hover:text-red-500"
                                    title="Logout"
                                />
                            </div>
                        ) : (
                            <button onClick={() => router.push('/login')} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
