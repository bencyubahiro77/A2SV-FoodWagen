import { useState, useEffect, useCallback } from "react";
import { foodApi } from "@/lib/api";
import { FoodItem, UseFoodsReturn } from "@/types/food";


export function useFoods(): UseFoodsReturn {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await foodApi.getAllFoods();
      setFoods(data);
      setFilteredFoods(data);
    } catch (err) {
      setError("No Meals Found");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const searchFoods = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!query.trim()) {
        // If search query is empty, fetch all foods
        const data = await foodApi.getAllFoods();
        setFilteredFoods(data);
      } else {
        // Use the API to search for foods by name
        const data = await foodApi.searchFoods(query);
        setFilteredFoods(data);
      }
    } catch (err) {
      setError("No Meals Found");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    foods,
    filteredFoods,
    loading,
    error,
    searchFoods,
    refetch: fetchFoods,
  };
}
