'use client'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'


function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [selectedRole, setSelectedRole] = useState('Customer')

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter both email and password.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.')
            return
        }

        setError('')
        console.log(`Logging in as ${selectedRole}:`, { email, password })
    }


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
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <button
                        onClick={() => router.push('/register')}
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
