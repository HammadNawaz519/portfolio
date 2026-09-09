"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface SlideShowProps {
  images: string[];
  captions?: string[];
}

const DEFAULT_CAPTIONS = [
  "01 • Editorial Landing & Architectural Hero",
  "02 • Dynamic Product Grid & Pricing Badges",
  "03 • Sartorial Co-ord Sets Collection Archive",
  "04 • Client Account Dashboard & Order Tracking",
  "05 • Product Page with Sizing, Color & Cart Flow",
];

const SlideShow: React.FC<SlideShowProps> = ({
  images,
  captions = DEFAULT_CAPTIONS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl select-none">
      {/* Main Image Stage */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsZoomed(true)}
          >
            <Image
              src={images[currentIndex]}
              alt={captions[currentIndex] || `Screenshot ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 850px"
              className="object-contain object-center"
              priority={currentIndex === 0}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-md">
                <Maximize2 className="w-3.5 h-3.5" /> Click to expand
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-md transition-all z-10 hover:scale-105 active:scale-95"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-md transition-all z-10 hover:scale-105 active:scale-95"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Counter / Caption Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="text-xs font-medium text-white/90 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
            {captions[currentIndex] || `Screenshot ${currentIndex + 1}`}
          </span>
          <span className="text-xs font-mono text-white/80 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-2 p-2.5 bg-neutral-950/80 border-t border-neutral-800/80 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? "border-white shadow-md scale-[1.02]"
                  : "border-transparent opacity-50 hover:opacity-85 hover:border-neutral-700"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="relative w-full max-w-6xl aspect-[16/9] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={captions[currentIndex] || "Fullscreen screenshot"}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-neutral-300 bg-neutral-900/90 px-4 py-1.5 rounded-full border border-neutral-700">
              {captions[currentIndex] || `Screenshot ${currentIndex + 1} of ${images.length}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlideShow;
