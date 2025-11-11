import axios from "axios";
import { FoodItem } from "@/types/food";

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const foodApi = {
  getAllFoods: async (): Promise<FoodItem[]> => {
    try {
      const response = await apiClient.get<FoodItem[]>("/Food");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFoodById: async (id: string): Promise<FoodItem> => {
    try {
      const response = await apiClient.get<FoodItem>(`/Food/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createFood: async (data: Omit<FoodItem, "id" | "createdAt">): Promise<FoodItem> => {
    try {
      const response = await apiClient.post<FoodItem>("/Food", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateFood: async (id: string, data: Partial<FoodItem>): Promise<FoodItem> => {
    try {
      const response = await apiClient.put<FoodItem>(`/Food/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteFood: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/Food/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
