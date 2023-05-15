import path from "path";

export const imagePaths = (filename: string) => {
  const originalExtension = path.extname(filename);
  const imagePathWithoutExtension = filename.slice(0, -originalExtension.length);
  const imagePath = path.join("uploads", `${imagePathWithoutExtension}.webp`);
  return { imagePath, toFilePath: path.join("src", imagePath) };
};
