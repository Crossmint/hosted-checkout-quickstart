"use client";

import Image from "next/image";

interface CollectionPreviewProps {
  title: string;
  price: string;
  imageUrl: string;
  imageSize?: number;
  imageAlt?: string;
}

export function CollectionPreview({
  title,
  price,
  imageUrl,
  imageSize,
  imageAlt,
}: CollectionPreviewProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-center w-full mb-6">{title}</h1>
      <Image
        src={imageUrl}
        alt={imageAlt ?? title}
        priority
        width={imageSize ?? 360}
        height={imageSize ?? 360}
        className="mb-4 rounded-xl"
      />

      <div className="flex items-center justify-between w-full mb-6">
        <span className="text-lg font-medium text-gray-700">Price</span>
        <span className="text-xl font-bold">{price}</span>
      </div>
    </>
  );
}
