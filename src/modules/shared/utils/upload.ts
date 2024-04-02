import { message } from "antd";
export const handleFileChange = async (
  e: any,
  setFile: any,
  setSelectedFileUrl: any
) => {
  if (e.file) {
    const selectedFile = e.file;
    setFile(selectedFile);
    if (
      selectedFile.type.startsWith("image/") &&
      selectedFile.size <= 2 * 1024 * 1024
    ) {
      try {
        const form = new FormData();
        form.append("file", selectedFile);
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
          console.log(data);

          setSelectedFileUrl(data.url);
        } else {
          message.error(
            "Erreur lors du téléchargement du fichier. Veuillez réessayer."
          );
        }
      } catch (error) {
        message.error(
          "Une erreur est survenue lors du téléchargement du fichier. Veuillez réessayer."
        );
        console.error(error);
      }
    } else {
      message.error(
        "Format ou taille de fichier invalide. Veuillez choisir un fichier image valide (max 2 Mo)."
      );
    }
  }
};
