// src/app/inventory/page.tsx

export default async function InventoryPage() {
  try {
    const res = await fetch('http://localhost:3000/api/fetchData', {
      next: { revalidate: 10 }, // Add revalidation if needed
    });
    const data = await res.json();

    return (
      <div>
        <h1>Inventory</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Failed to load inventory data.</div>;
  }
}
