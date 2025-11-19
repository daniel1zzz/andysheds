import Image from "next/image";
import { X, ZoomIn, Share2, ZoomOut } from "lucide-react";

interface LightboxProps {
  image: string | null;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onShare: (imageUrl: string) => void;
  zoomLevel: number;
}

export default function Lightbox({
  image,
  onClose,
  onZoomIn,
  onZoomOut,
  onShare,
  zoomLevel,
}: LightboxProps) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => onClose()}
    >
      <button
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        onClick={() => onClose()}
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="absolute top-6 left-6 flex gap-3 z-10">
        <div className="flex gap-4 p-3 bg-white/10 rounded-full transition-colors">
          <button
            className="rounded-full hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              onZoomIn();
            }}
          >
            <ZoomIn className="w-6 h-6 text-white" />
          </button>
          <button
            className="rounded-full hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              onZoomOut();
            }}
          >
            <ZoomOut className="w-6 h-6 text-white" />
          </button>
        </div>
        <button
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onShare(image);
          }}
        >
          <Share2 className="w-6 h-6 text-white" />
        </button>
      </div>
      <div
        className="relative max-w-7xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt="Enlarged view"
          width={1200}
          height={900}
          className="w-auto h-auto max-h-[90vh] object-contain transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
    </div>
  );
}
