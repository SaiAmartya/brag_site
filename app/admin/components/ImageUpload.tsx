"use client";

import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  bucket?: string;
}

export default function ImageUpload({ value, onChange, bucket = "portfolio" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);
      
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading image");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  // Helper to handle both full URLs and local paths for preview
  const getImageSrc = (src: string) => {
     if (src.startsWith('http') || src.startsWith('data:')) return src;
     return src.startsWith('/') ? src : `/${src}`;
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-ash uppercase">Image</label>
      
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative w-24 h-24 bg-void border border-steel rounded overflow-hidden group shrink-0">
            <Image 
              src={getImageSrc(value)} 
              alt="Preview" 
              fill 
              className="object-cover"
              unoptimized={!value.startsWith("http")} 
            />
            <button
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-coral"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`w-24 h-24 bg-void border border-dashed border-steel rounded flex flex-col items-center justify-center shrink-0 transition-colors ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-electric'}`}
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-electric animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-ash mb-1" />
                <span className="text-[10px] text-ash font-mono">Upload</span>
              </>
            )}
          </div>
        )}

        <div className="flex-1 space-y-2 pt-2">
           <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <div className="text-xs text-ash">
            <p>Upload an image for this item.</p>
            <p className="opacity-70 mt-1">Supports JPG, PNG, GIF, WEBP.</p>
          </div>
          {error && (
            <p className="text-xs text-coral flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-coral"></span>
                {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
