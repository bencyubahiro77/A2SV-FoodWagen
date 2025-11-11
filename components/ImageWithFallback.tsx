"use client";

import { useState } from "react";
import Image from "next/image";
import { Store } from "lucide-react";
import { ImageWithFallbackProps } from "@/types/food";


export function ImageWithFallback({
  src,
  alt,
  fallbackIcon,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        {fallbackIcon || <Store className="h-16 w-16 text-gray-400" />}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
