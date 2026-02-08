"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function UploadProduct() {
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Electronics",
    condition: "new",
    location: "Bukuru",
    stock: "1",
    tags: ""
  });

  if (!user) {
    router.push("/");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (images.length + files.length > 8) {
      alert("Maximum 8 images allowed");
      return;
    }
    
    setImages([...images, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("condition", formData.condition);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("stock", formData.stock);
      if (formData.tags) {
        formDataToSend.append("tags", JSON.stringify(formData.tags.split(",").map(t => t.trim())));
      }
      
      images.forEach(image => {
        formDataToSend.append("images", image);
      });

      await api.createProduct(formDataToSend);
      alert("Product uploaded successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Upload Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Product Images (Max 8)</label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={preview} alt="" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <label className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500">
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                  <Upload className="w-8 h-8 text-gray-400" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Price (₦)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              >
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Properties</option>
                <option>Sports</option>
                <option>Books</option>
                <option>Food</option>
                <option>Automotive</option>
                <option>Services</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option>Bukuru</option>
              <option>Rayfield</option>
              <option>Terminus</option>
              <option>Lamingo</option>
              <option>Angwan Rogo</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. wireless, bluetooth, headphones"
              className="w-full px-4 py-3 border rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
