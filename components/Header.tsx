"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

interface HeaderProps {
  onAddMeal: () => void;
}

export function Header({ onAddMeal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-12 md:px-16 lg:px-24">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-brand-primary" />
            <span className="text-xl font-bold text-gray-900">
              <span className="text-brand-primary">Food</span>Wagen
            </span>
          </div>
        </Link>

        <Button 
          onClick={onAddMeal}
          className="text-white rounded-full px-6"
          style={{ background: 'var(--brand-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
        >
          Add Meal
        </Button>
      </div>
    </header>
  );
}
