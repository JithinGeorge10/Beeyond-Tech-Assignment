import React from 'react'

function Banner() {
  return (
    <div className="w-full">
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
            Fast delivery at your fingertips
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Order what you need and track it in real-time with Quick Commerce.
          </p>
          <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-purple-50 transition duration-300">
            Browse Products below
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
