'use client'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { customerRegister } from '../../lib/api/auth/customer'
import { deliveryPartnerRegister } from '../../lib/api/auth/deliveryPartner'
import toast from 'react-hot-toast';

function RegisterPage() {
    const router = useRouter()

    const [role, setRole] = useState('Customer')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);

            if (!name || !email || !password || !phone || (role === 'Customer' && !address)) {
                setError('Please fill in all required fields.')
                setLoading(false);
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address.')
                setLoading(false);
                return
            }

            setError('')
            console.log(`Registering ${role}`, { name, email, password, phone, ...(role === 'Customer' && { address }) })

            if (role === 'Customer') {
                const userDetails = {
                    fullName: name,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                    deliveryAddress: address
                }

                const response = await customerRegister(userDetails)
                console.log(response);
                if (response.success) {
                    toast.success(response.message);
                    router.push('/ShopPage');
                }
            }


            if (role === 'Delivery Partner') {
                const deliveryPartnerDetails = {
                    fullName: name,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                }

                const response = await deliveryPartnerRegister(deliveryPartnerDetails)
                console.log(response);
                if (response.success) {
                    toast.success(response.message);
                    router.push('/DeliveryPartnerPage');
                }
            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error.message || 'Registration failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-2 text-black">Quick Commerce</h1>
                <p className="text-center text-gray-600 mb-6">Create your account</p>

                {/* Role Selector */}
                <div className="flex justify-between gap-2 mb-6">
                    {['Customer', 'Delivery Partner'].map(r => (
                        <button
                            key={r}
                            className={`flex-1 py-2 text-sm rounded-md border transition ${role === r
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                            onClick={() => setRole(r)}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* Email */}
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

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Phone number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                {role === 'Customer' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Your address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            rows={3}
                        />
                    </div>
                )}

                {/* Error */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    onClick={handleRegister}
                    disabled={loading}
                    className={`w-full bg-black text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                        }`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already having an account?{' '}
                    <button
                        onClick={() => router.push('/login')}
                        className="text-black hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
