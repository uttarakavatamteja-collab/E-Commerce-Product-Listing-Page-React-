import { useState, useEffect, useCallback, useMemo } from 'react';
import { mockProducts } from '../data/mockProducts';

const API_URL = 'https://fakestoreapi.com/products';

/**
 * Custom hook to fetch and filter products from FakeStore API.
 * Includes a fallback to mock data if the API is unreachable.
 * @param {string} selectedCategory - The currently selected category.
 * @param {string} searchQuery - The search term for filtering by title.
 * @returns {object} { filteredProducts, loading, error, refetch, isDemoMode }
 */
export const useProducts = (selectedCategory, searchQuery) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsDemoMode(false);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API unstable or unreachable.');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.warn('API Error, falling back to mock data:', err);
      // Fallback to mock data so the user can still see the UI
      setProducts(mockProducts);
      setIsDemoMode(true);
      // We don't set a hard error state because we want to show the mock data instead
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
        selectedCategory.toLowerCase() === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return {
    filteredProducts,
    loading,
    error,
    refetch: fetchProducts,
    isDemoMode
  };
};

export default useProducts;
