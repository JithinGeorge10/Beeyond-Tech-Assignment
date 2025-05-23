'use client'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { customerLogin } from '../../lib/api/auth/customer'
import { deliveryPartnerLogin } from '../../lib/api/auth/deliveryPartner'
import { adminLogin } from '../../lib/api/auth/admin'


function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        const checkTokens = async () => {
            const token1 = localStorage.getItem('userAccessToken');
            const token2 = localStorage.getItem('adminAccessToken');
            const token3 = localStorage.getItem('deliveryPartnerAccessToken');
    
            const tokens = [
                { token: token1, redirect: '/ShopPage' },
                { token: token2, redirect: '/AdminPage' },
                { token: token3, redirect: '/DeliveryPartnerPage' },
            ];
    
            for (const { token, redirect } of tokens) {
                if (!token) continue;
    
                try {
                    const res = await fetch('/api/verify-token', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    const isValid = await res.json();
    
                    if (isValid.success) {
                        router.replace(redirect);
                        return;
                    }
                } catch (err) {
                    console.error('Error verifying token:', err);
                }
            }
        };
    
        checkTokens();
    }, []);
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [selectedRole, setSelectedRole] = useState('Customer')
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            setLoading(false);
            setError('Please enter both email and password.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setLoading(false);
            setError('Please enter a valid email address.')
            return
        }

        setError('')
        console.log(`Logging in as ${selectedRole}:`, { email, password })

        if (selectedRole === 'Customer') {
            const userDetails = {
                email: email,
                password: password,
            }

            const response = await customerLogin(userDetails)
            console.log(response);
            if (response.success) {
                toast.success(response.message);
                router.push('/ShopPage');
            }
        }
        if (selectedRole === 'Delivery Partner') {
            const deliveryPartnerDetails = {
                email: email,
                password: password,
            }

            const response = await deliveryPartnerLogin(deliveryPartnerDetails)
            console.log(response);
            if (response.success) {
                toast.success(response.message);
                router.push('/DeliveryPartnerPage');
            }
        }
        if (selectedRole === 'Admin') {
            const adminDetails = {
                email: email,
                password: password,
            }

            const response = await adminLogin(adminDetails)
            console.log(response);
            
            if (response.success) {
                toast.success(response.message);
                router.push('/AdminPage');
            }
        }
    }

//login
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-2 text-black">Quick Commerce</h1>
                <p className="text-center text-gray-600 mb-6">Login<br />Enter your credentials to access your account</p>

                {/* Role Selector */}
                <div className="flex justify-between gap-2 mb-6">
                    {['Customer', 'Delivery Partner', 'Admin'].map(role => (
                        <button
                            key={role}
                            className={`flex-1 py-2 text-sm rounded-md border transition ${selectedRole === role
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                            onClick={() => setSelectedRole(role)}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2 border rounded-md text-black pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute top-9 right-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Login Button */}
                <button
                    type="submit"
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full bg-black text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                        }`}
                >
                    {loading ? 'Please wait...' : 'Login'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <button
                        onClick={() => router.push('/Register')}
                        className="text-black hover:underline font-medium"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
