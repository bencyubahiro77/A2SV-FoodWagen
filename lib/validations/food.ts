import { z } from "zod";

export const foodFormSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string().url("Food image URL is required"),
  logo: z.string().url("Restaurant logo URL is required"),
  Price: z.string().min(1, "Price is required"),
  status: z.enum(["Open Now", "Closed"]),
  open: z.boolean(),
  avatar: z.string().optional(),
});

export type FoodFormData = z.infer<typeof foodFormSchema>;
