export const uploadService = {
	/** Unsigned Cloudinary upload (preset ml_default). Resolves to the image URL. */
	async image(file: File | Blob | string): Promise<string> {
		const form = new FormData();
		form.append("file", file);
		form.append("upload_preset", "ml_default");
		try {
			const res = await $fetch<{ secure_url?: string }>(
				`https://api.cloudinary.com/v1_1/${useRuntimeConfig().public.CLOUD_NAME}/image/upload`,
				{ method: "POST", body: form }
			);
			if (!res.secure_url) throw new Error("No image URL returned");
			return res.secure_url;
		} catch (e: any) {
			throw new ApiError(e?.message || "Upload failed", e?.status ?? 0);
		}
	},
};
