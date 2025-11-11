"use client";

import { useState } from "react";
import { Search, Truck, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroProps } from "@/types/food";


export function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, deliveryType);
    }
  };

  return (
    <section className="relative overflow-hidden" style={{background: 'var(--brand-primary)'}}>
      <div className="container mx-auto px-12 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Are you starving?
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setDeliveryType("delivery")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    deliveryType === "delivery"
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Truck className="h-4 w-4" />
                  <span className="font-medium">Delivery</span>
                </button>
                <button
                  onClick={() => setDeliveryType("pickup")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    deliveryType === "pickup"
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Store className="h-4 w-4" />
                  <span className="font-medium">Pickup</span>
                </button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-brand-primary text-gray-900"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="text-white px-6 h-12 rounded-md"
                  style={{ background: 'var(--brand-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
                >
                  Find Meal
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image - Positioned at bottom */}
          <div className="relative hidden md:block h-full">
            <div className="absolute -bottom-8 right-0 w-[400px] h-[400px] translate-y-[30%]">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious food"
                  fill
                  className="object-cover rounded-full shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
