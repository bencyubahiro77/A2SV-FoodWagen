"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FoodCard } from "@/components/FoodCard";
import { FoodCardSkeleton } from "@/components/FoodCardSkeleton";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { EditFoodDialog } from "@/components/EditFoodDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useFoods } from "@/hooks/useFoods";
import { FoodItem } from "@/types/food";
import { Toaster } from "sonner";

export default function Home() {
  const { filteredFoods, loading, error, searchFoods, refetch } = useFoods();
  const [visibleCount, setVisibleCount] = useState(8);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleSearch = (query: string) => {
    searchFoods(query);
    setVisibleCount(8);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleAddMeal = () => {
    setAddDialogOpen(true);
  };

  const handleEditMeal = (food: FoodItem) => {
    setSelectedFood(food);
    setEditDialogOpen(true);
  };

  const handleDeleteMeal = (food: FoodItem) => {
    setSelectedFood(food);
    setDeleteDialogOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  const displayedFoods = filteredFoods.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFoods.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" richColors />
      <Header onAddMeal={handleAddMeal} />
      <Hero onSearch={handleSearch} />

      <main className="flex-1">
        <section className="container mx-auto px-12 md:px-16 lg:px-24 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Featured Restaurants
          </h2>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <FoodCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="mb-4">{error}</p>
            </div>
          )}

          {!loading && !error && filteredFoods.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No meals found. 
              </p>
            </div>
          )}

          {!loading && !error && filteredFoods.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onEdit={() => handleEditMeal(food)}
                    onDelete={() => handleDeleteMeal(food)}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={handleLoadMore}
                    className="text-white px-6"
                    style={{ background: 'var(--brand-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
                  >
                    Load more ↓
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />

      <AddFoodDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={handleSuccess}
      />

      <EditFoodDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        food={selectedFood}
        onSuccess={handleSuccess}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        foodId={selectedFood?.id || null}
        foodName={selectedFood?.name || ""}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
