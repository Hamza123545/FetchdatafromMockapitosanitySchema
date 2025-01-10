import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

async function insertProductData(products: any) {
  const insertPromises = products.map((product: any) => {
    return client.create({
      _type: 'product',
      name: product.name,
      details: product.details,
      price: product.price,
      category: product.category,
    })
  })
  await Promise.all(insertPromises)
}

async function insertInventoryData(inventory: any) {
  const insertPromises = inventory.map((item: any) => {
    return client.create({
      _type: 'inventory',
      productId: item.productId,
      quantity: item.quantity,
      warehouseLocation: item.warehouseLocation,
    })
  })
  await Promise.all(insertPromises)
}

export async function GET(req: NextRequest) {
  const productsUrl = 'https://677db36994bde1c125292f94.mockapi.io/Products'
  const inventoryUrl = 'https://677db36994bde1c125292f94.mockapi.io/Inventory'
  
  // Fetch products and inventory data from MockAPI
  const products = await fetch(productsUrl).then(res => res.json())
  const inventory = await fetch(inventoryUrl).then(res => res.json())

  // Insert data into Sanity
  try {
    await insertProductData(products)
    await insertInventoryData(inventory)

    return NextResponse.json({ message: 'Data fetched and inserted into Sanity successfully!' })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to insert data into Sanity' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  // Handle POST request for inserting new data or updating data
  return NextResponse.json({ message: 'POST request received!' })
}
