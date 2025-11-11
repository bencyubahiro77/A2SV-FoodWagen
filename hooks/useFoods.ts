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
      setError("Failed to load meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const searchFoods = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredFoods(foods);
        return;
      }

      const filtered = foods.filter(
        (food) =>
          food.name.toLowerCase().includes(query.toLowerCase()) ||
          food.restaurantName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoods(filtered);
    },
    [foods]
  );

  return {
    foods,
    filteredFoods,
    loading,
    error,
    searchFoods,
    refetch: fetchFoods,
  };
}
