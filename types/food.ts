import { ImageProps } from "next/image";

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
  status?: "Open Now" | "Open" | "Closed";
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

export interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  foodId: string | null;
  foodName: string;
  onSuccess: () => void;
} 

export interface EditFoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  food: FoodItem | null;
  onSuccess: () => void;
}

export interface AddFoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export interface HeaderProps {
  onAddMeal: () => void;
}

export interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackIcon?: React.ReactNode;
}
