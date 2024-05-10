import { message } from "antd";

export const handleFileChange = async (
  e: any,
  setFile: any,
  setSelectedFileUrl: any,
  setUploading: any,
) => {
  if (e.file) {
    const selectedFile = e.file;
    setFile(selectedFile);

    if (
      selectedFile.type.startsWith("image/") &&
      selectedFile.size <= 2 * 1024 * 1024
    ) {
      try {
        setUploading(true); // Set uploading to true when starting upload

        const form = new FormData();
        form.append("file", selectedFile);
        form.append("upload_preset", "firaslatrach");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload",
          {
            method: "post",
            body: form,
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSelectedFileUrl(data.url);
        } else {
          message.error("Error uploading file. Please try again.");
        }
      } catch (error) {
        message.error(
          "An error occurred while uploading the file. Please try again.",
        );
        console.error(error);
      } finally {
        setUploading(false); // Set uploading to false when upload completes
      }
    } else {
      message.error(
        "Invalid file format or size. Please choose a valid image file (max 2 MB).",
      );
    }
  }
};
