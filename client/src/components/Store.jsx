import { useState, useEffect } from 'react';
import { FaRegHeart } from 'react-icons/fa6';

const API_BASE = '/api';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="shop" className="bg-white py-8 scroll-mt-16">
      <h2 className="text-center text-2xl font-semibold text-gray-800 pt-6 pb-2">
        Our Video Production Services
      </h2>
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 px-4">
        {loading && (
          <p className="w-full text-center py-8 text-gray-500">Loading services…</p>
        )}
        {error && (
          <p className="w-full text-center py-8 text-red-600">Could not load services. Is the server running?</p>
        )}
        {!loading && !error && products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4 flex flex-col">
            <a href="#" className="block group">
              <img
                className="w-full object-cover aspect-square hover:grow hover:shadow-lg rounded"
                src={product.image}
                alt={product.name}
              />
              <div className="pt-3 flex items-center justify-between">
                <p className="font-medium text-gray-800">{product.name}</p>
                <FaRegHeart className="h-5 w-5 text-gray-500 hover:text-black shrink-0" />
              </div>
              <p className="pt-1 text-gray-900">{product.price}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Store;
