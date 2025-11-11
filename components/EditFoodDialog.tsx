"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { foodFormSchema, type FoodFormData } from "@/lib/validations/food";
import { foodApi } from "@/lib/api";
import { EditFoodDialogProps } from "@/types/food";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export function EditFoodDialog({ open, onOpenChange, food, onSuccess }: EditFoodDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodFormSchema) as any,
  });

  const statusValue = watch("status");

  useEffect(() => {
    if (food) {
      reset({
        name: food.name,
        restaurantName: food.restaurantName || "",
        rating: food.rating || 0,
        image: food.image || "",
        logo: food.logo || "",
        Price: food.Price,
        status: food.status || "Open Now",
        open: food.open,
        avatar: food.avatar,
      });
    }
  }, [food, reset]);

  const onSubmit = async (data: FoodFormData) => {
    if (!food) return;

    setIsLoading(true);
    try {
      await foodApi.updateFood(food.id, {
        ...data,
        open: data.status === "Open Now",
      });
      toast.success("Meal updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update meal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-brand-primary text-xl text-center">Edit Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Food name
            </Label>
            <Input
              id="name"
              placeholder="Food name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurantName" className="text-sm">
              Restaurant name
            </Label>
            <Input
              id="restaurantName"
              placeholder="Restaurant is required"
              {...register("restaurantName")}
              className={errors.restaurantName ? "border-red-500" : ""}
            />
            {errors.restaurantName && (
              <p className="text-xs text-red-500">{errors.restaurantName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm">
              Food rating
            </Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              {...register("rating")}
              className={errors.rating ? "border-red-500" : ""}
            />
            {errors.rating && (
              <p className="text-xs text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm">
              Food image (URL)
            </Label>
            <Input
              id="image"
              placeholder="https://cloudinary.com/yourimage/foodimage.png"
              {...register("image")}
              className={errors.image ? "border-red-500" : ""}
            />
            {errors.image && (
              <p className="text-xs text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm">
              Restaurant logo (URL)
            </Label>
            <Input
              id="logo"
              placeholder="https://cloudinary.com/yourimage/foodimage.png"
              {...register("logo")}
              className={errors.logo ? "border-red-500" : ""}
            />
            {errors.logo && (
              <p className="text-xs text-red-500">{errors.logo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Price" className="text-sm">
              Price
            </Label>
            <Input
              id="Price"
              placeholder="12.99"
              {...register("Price")}
              className={errors.Price ? "border-red-500" : ""}
            />
            {errors.Price && (
              <p className="text-xs text-red-500">{errors.Price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm">
              Restaurant status (optional)
            </Label>
            <Select
              value={statusValue}
              onValueChange={(value) => setValue("status", value as "Open Now" | "Closed")}
            >
              <SelectTrigger className={`w-full ${errors.status ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-white"
              style={{ background: 'var(--brand-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Food...
                </>
              ) : (
                "Update Food"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
