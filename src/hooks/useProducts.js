import { useState, useEffect, useCallback, useMemo } from 'react';

const API_URL = 'https://fakestoreapi.com/products';

/**
 * Custom hook to fetch and filter products from FakeStore API.
 * @param {string} selectedCategory - The currently selected category.
 * @param {string} searchQuery - The search term for filtering by title.
 * @returns {object} { filteredProducts, loading, error, refetch }
 */
export const useProducts = (selectedCategory, searchQuery) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to load products. Please try again later.');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return {
    filteredProducts,
    loading,
    error,
    refetch: fetchProducts
  };
};

export default useProducts;
