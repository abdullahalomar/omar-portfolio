import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | string | null;
    const cloudName =
      (formData.get("cloudName") as string) ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "demo";
    const uploadPreset =
      (formData.get("uploadPreset") as string) ||
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      "unsigned_preset";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const uploadData = new FormData();

    if (typeof file === "string") {
      uploadData.append("file", file);
    } else {
      uploadData.append("file", file);
    }
    uploadData.append("upload_preset", uploadPreset);

    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Failed to upload image to Cloudinary" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Server error while uploading image" },
      { status: 500 }
    );
  }
}
