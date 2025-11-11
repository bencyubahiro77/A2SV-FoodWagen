"use client";

import { useState } from "react";
import { toast } from "sonner";
import { foodApi } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DeleteConfirmDialogProps } from "@/types/food";


export function DeleteConfirmDialog({
  open,
  onOpenChange,
  foodId,
  foodName,
  onSuccess,
}: DeleteConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!foodId) return;

    setIsLoading(true);
    try {
      await foodApi.deleteFood(foodId);
      toast.success("Meal deleted successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to delete meal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-brand-primary text-xl">Delete Meal</DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">
            Are you sure you want to delete <strong>{foodName}</strong>? This action cannot be reversed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 text-white"
            style={{ background: 'var(--brand-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes"
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
      </DialogContent>
    </Dialog>
  );
}
