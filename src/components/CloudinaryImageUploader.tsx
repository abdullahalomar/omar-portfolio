"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader2, Check } from "lucide-react";

interface CloudinaryImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function CloudinaryImageUploader({
  value,
  onChange,
  label = "Upload Image (Cloudinary)",
  placeholder = "https://res.cloudinary.com/...",
  aspectRatio = "auto",
}: CloudinaryImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);
  const [isInputUrlOpen, setIsInputUrlOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    await uploadFileToCloudinary(file);
  };

  const uploadFileToCloudinary = async (file: File) => {
    setIsUploading(true);
    setErrorMsg(null);
    setNoticeMsg(null);

    try {
      // Fetch saved custom cloud credentials from localStorage if user updated them in Admin Settings
      const savedCloudName = typeof window !== "undefined" ? localStorage.getItem("cloudinary_cloud_name") : null;
      const savedPreset = typeof window !== "undefined" ? localStorage.getItem("cloudinary_upload_preset") : null;

      const formData = new FormData();
      formData.append("file", file);
      if (savedCloudName) formData.append("cloudName", savedCloudName);
      if (savedPreset) formData.append("uploadPreset", savedPreset);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      if (data.url) {
        onChange(data.url);
        setUrlInput(data.url);
      } else {
        throw new Error("No image URL returned from Cloudinary");
      }
    } catch (err: any) {
      console.error("Cloudinary upload failed, falling back to Data URL:", err);
      try {
        const localDataUrl = await readFileAsDataUrl(file);
        onChange(localDataUrl);
        setUrlInput(localDataUrl);
        setNoticeMsg(
          `Cloudinary: "${err.message || "Upload preset not found"}". Image saved as local fallback and is showing live! Add Cloud Name & Unsigned Preset in Admin -> Settings for Cloudinary hosting.`
        );
      } catch (fallbackErr) {
        setErrorMsg(err.message || "Failed to upload image.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setIsInputUrlOpen(false);
      setErrorMsg(null);
    }
  };

  const handleRemove = () => {
    onChange("");
    setUrlInput("");
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square max-w-[200px]"
      : aspectRatio === "video"
      ? "aspect-video max-w-md"
      : "min-h-[120px]";

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-slate-300 block">{label}</label>}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Image Preview & Upload Zone */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group p-2 flex flex-col items-center justify-center">
          <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center`}>
            {value.startsWith("http") || value.startsWith("/") || value.startsWith("data:") ? (
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-3xl p-4">{value}</div>
            )}

            {/* Hover Actions Bar */}
            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition-all"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full pt-2 px-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="truncate max-w-[240px] text-sky-400">{value}</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Cloudinary Ready
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed border-slate-700 hover:border-sky-500/60 bg-[#0f172a] hover:bg-[#131d35] rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
              isUploading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-sky-400 py-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs font-semibold">Uploading image to Cloudinary...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-200">
                    Click or drag image to upload to <span className="text-sky-400">Cloudinary</span>
                  </p>
                  <p className="text-[11px] text-slate-400">PNG, JPG, WEBP, SVG up to 10MB</p>
                </div>
              </>
            )}
          </div>

          {/* Alternative Direct URL Toggle */}
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setIsInputUrlOpen(!isInputUrlOpen)}
              className="text-slate-400 hover:text-sky-400 flex items-center gap-1 text-[11px] transition-colors"
            >
              <LinkIcon className="w-3 h-3 text-sky-400" />
              <span>Or enter direct Image / Cloudinary URL</span>
            </button>
          </div>

          {isInputUrlOpen && (
            <form onSubmit={handleApplyUrl} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder={placeholder}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shrink-0 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply</span>
              </button>
            </form>
          )}
        </div>
      )}

      {noticeMsg && (
        <p className="text-xs text-amber-300 pt-1 font-mono leading-relaxed bg-amber-950/30 p-2.5 rounded-xl border border-amber-500/40 shadow-sm">
          💡 {noticeMsg}
        </p>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-400 pt-1 font-mono leading-tight bg-rose-950/20 p-2 rounded-xl border border-rose-500/30">
          ⚠️ {errorMsg}
        </p>
      )}
    </div>
  );
}
