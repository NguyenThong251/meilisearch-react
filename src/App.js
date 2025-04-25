import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/search",
        {
          params: { query },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <div>
        {products.length > 0 ? (
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.id} className="border p-4 rounded">
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-green-600">${product.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
