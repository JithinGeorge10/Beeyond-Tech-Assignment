import React from 'react'

function Footer() {
  return (
    <div>
       <footer className="bg-purple-50 border-t border-purple-100 py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-purple-600 hover:text-purple-700">About</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">Contact</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">FAQ</a>
            <a href="#" className="text-purple-600 hover:text-purple-700">Shipping</a>
          </div>
          <p className="text-gray-600">© 2023 Quick Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
