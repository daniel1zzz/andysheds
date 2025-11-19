"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Share2, ZoomIn } from "lucide-react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Lightbox from "@/components/lightbox";
import { shedModels } from "@/lib/shed-data";

export default function GalleryPage() {
  const params = useParams();
  const shedId = parseInt(params.id as string);
  const shed = shedModels.find((s) => s.id === shedId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shed?.title,
          text: shed?.subtitle,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleImageShare = async (imageUrl: string) => {
    const fullUrl = `${window.location.origin}${imageUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${shed?.title} - Photo`,
          url: fullUrl,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(fullUrl);
      alert("Image link copied to clipboard!");
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  if (!shed) {
    return <div>Shed not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Back Button and Share */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Gallery</span>
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Shed Info */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wide">
            {shed.model}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
            {shed.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed mb-4">
            {shed.subtitle}
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shed.gallery?.map((image, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/20 p-0 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${shed.title} - Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageShare(image);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Lightbox
        image={selectedImage}
        onClose={handleCloseLightbox}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onShare={handleImageShare}
        zoomLevel={zoomLevel}
      />

      <Footer />
    </div>
  );
}
