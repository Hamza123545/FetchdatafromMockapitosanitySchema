import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import fetch from 'node-fetch'  // Import node-fetch

// Define types for products and inventory data
type Product = {
  name: string
  details: string
  price: number
  category: string
}

type InventoryItem = {
  productId: string
  quantity: number
  warehouseLocation: string
}

// Helper function to fetch data from MockAPI
async function fetchMockAPIData(url: string): Promise<any> {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Function to insert product data into Sanity
async function insertProductData(products: Product[]) {
  const insertPromises = products.map(async (product) => {
    try {
      return await client.create({
        _type: 'product',
        name: product.name,
        details: product.details,
        price: product.price,
        category: product.category,
      })
    } catch (error) {
      console.error(`Failed to insert product: ${product.name}`, error)
      return null
    }
  })

  // Wait for all promises to resolve
  await Promise.all(insertPromises)
}

// Function to insert inventory data into Sanity
async function insertInventoryData(inventory: InventoryItem[]) {
  const insertPromises = inventory.map(async (item) => {
    try {
      return await client.create({
        _type: 'inventory',
        productId: item.productId,
        quantity: item.quantity,
        warehouseLocation: item.warehouseLocation,
      })
    } catch (error) {
      console.error(`Failed to insert inventory for productId: ${item.productId}`, error)
      return null
    }
  })

  // Wait for all promises to resolve
  await Promise.all(insertPromises)
}

// Handle the GET request
export async function GET(req: NextRequest) {
  const productsUrl = 'https://677db36994bde1c125292f94.mockapi.io/Products'
  const inventoryUrl = 'https://677db36994bde1c125292f94.mockapi.io/Inventory'
  
  try {
    // Fetch products and inventory data from MockAPI
    const products = await fetchMockAPIData(productsUrl) as Product[]
    const inventory = await fetchMockAPIData(inventoryUrl) as InventoryItem[]

    // Insert data into Sanity
    await insertProductData(products)
    await insertInventoryData(inventory)

    return NextResponse.json({ message: 'Data fetched and inserted into Sanity successfully!' })
  } catch (error) {
    console.error('Error occurred while inserting data:', error)
    return NextResponse.json({ message: 'Failed to insert data into Sanity' }, { status: 500 })
  }
}
