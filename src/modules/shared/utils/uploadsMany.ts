import { message } from "antd";

export const handleFileChange = async (
  e: any,
  setSelectedFileUrl: any
) => {
  const fileList = e.fileList;

  try {
    const promises = fileList.map(async (file: File) => {
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
          return data.url;
        } else {
          throw new Error("Error uploading file");
        }
      } else {
        throw new Error(
          "Invalid file format or size. Please choose a valid image file (max 2 MB)."
        );
      }
    });

    const urls = await Promise.all(promises);
    setSelectedFileUrl(urls);
  } catch (error) {
    message.error(
      "An error occurred while uploading the file. Please try again."
    );
    console.error(error);
  }
};
