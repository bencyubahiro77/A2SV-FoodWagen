export interface FoodItem {
  id: string;
  createdAt: string;
  name: string;
  avatar?: string;
  rating?: number;
  open: boolean;
  logo?: string;
  Price: string;
  restaurantName?: string;
  image?: string;
  status?: "Open" | "Closed";
}

export interface SearchParams {
  query?: string;
  deliveryType?: "delivery" | "pickup";
}

export interface UseFoodsReturn {
  foods: FoodItem[];
  filteredFoods: FoodItem[];
  loading: boolean;
  error: string | null;
  searchFoods: (query: string) => void;
  refetch: () => Promise<void>;
}

export interface HeroProps {
  onSearch?: (query: string, deliveryType: "delivery" | "pickup") => void;
}

export interface FoodCardProps {
  food: FoodItem;
}