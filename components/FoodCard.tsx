"use client";

import { Star, MoreVertical, Store, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FoodCardProps} from "@/types/food";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface FoodCardWithActionsProps extends FoodCardProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function FoodCard({ food, onEdit, onDelete }: FoodCardWithActionsProps) {
  const isOpen = food.status === "Open Now";
  const price = food.Price ? parseFloat(food.Price.toString()) : 0;
  const rating = food.rating ? parseFloat(food.rating.toString()) : 0;
  const hasRestaurantName = food.restaurantName;

  return (
    <div className="overflow-hidden group">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={food.image}
          alt={food.name || "Food item"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-md" style={{background: 'var( --brand-secondary)'}}>
          ${price.toFixed(2)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 pl-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {(food.logo || hasRestaurantName) && (
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                {food.logo ? (
                  <ImageWithFallback
                    src={food.logo}
                    alt={food.restaurantName || "Restaurant logo"}
                    fill
                    className="object-cover"
                    fallbackIcon={<Store className="h-6 w-6 text-gray-400" />}
                  />
                ) : (
                  <Store className="h-6 w-6 text-gray-400" />
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-sm mb-1">
                {food.name || "Unnamed Item"}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-600">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2">
                <MoreVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3">
          <Badge
            variant={isOpen ? "success" : "warning"}
            className="text-xs font-medium"
          >
            {food.status || "Unknown"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
