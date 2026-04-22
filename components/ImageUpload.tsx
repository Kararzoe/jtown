"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ImageUpload({ onUpload, maxFiles = 5 }: any) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < Math.min(files.length, maxFiles - images.length); i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        uploadedUrls.push(data.url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    const newImages = [...images, ...uploadedUrls];
    setImages(newImages);
    onUpload(newImages);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpload(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {images.length < maxFiles && (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}