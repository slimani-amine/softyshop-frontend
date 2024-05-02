import { message } from "antd";

export const handleFileChange = async (
  e: any,
  setFile: any,
  setSelectedFileUrl: any,
  setUploading: any
) => {
  if (e.fileList.length > 0) {
    const files = e.fileList.map((file: any) => file.originFileObj);
    setFile(files);
    const uploadedFileUrls: string[] = [];

    try {
      setUploading(true);
      const uploadPromises = files.map(async (file: any) => {
        if (
          file.type.startsWith("image/") &&
          file.size <= 2 * 1024 * 1024
        ) {
          const form = new FormData();
          form.append("file", file);
          form.append("upload_preset", "firaslatrach");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload",
            {
              method: "post",
              body: form,
            }
          );

          if (response.ok) {
            const data = await response.json();
            uploadedFileUrls.push(data.url);
          } else {
            message.error(
              "Error uploading file. Please try again."
            );
          }
        } else {
          message.error(
            "Invalid file format or size. Please choose a valid image file (max 2 MB)."
          );
        }
      });

      await Promise.all(uploadPromises);

      setSelectedFileUrl(uploadedFileUrls);
    } catch (error) {
      message.error(
        "An error occurred while uploading files. Please try again."
      );
      console.error(error);
    } finally {
      setUploading(false);
    }
  }
};
