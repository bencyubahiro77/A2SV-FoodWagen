import { Card } from "@/components/ui/card";

export function FoodCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200" />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-md bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>
    </Card>
  );
}
