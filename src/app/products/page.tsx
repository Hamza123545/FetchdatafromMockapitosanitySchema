// src/app/products/page.tsx

import { client } from '@/sanity/lib/client'
import React from 'react'

// Define the structure of product data
type Product = {
  name: string
  details: string
  price: number
  category: string
  image?: {
    asset: {
      url: string
    }
  }
}

// Fetch products data from Sanity using GROQ query
export async function fetchProducts() {
  const query = '*[_type == "product"]' // Sanity query to fetch all products

  // Fetch products from Sanity
  const products: Product[] = await client.fetch(query)
  return products
}

const ProductsPage = async () => {
  // Fetch products data
  const products = await fetchProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Product Image */}
            {product.image && product.image.asset && (
              <img
                src={product.image.asset.url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              {/* Product Name */}
              <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>

              {/* Product Details */}
              <p className="text-gray-600 text-sm mt-2">{product.details}</p>

              {/* Product Price */}
              <p className="text-lg font-semibold text-gray-900 mt-4">${product.price}</p>

              {/* Product Category */}
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>

              {/* Action Button */}
              <div className="mt-4">
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
