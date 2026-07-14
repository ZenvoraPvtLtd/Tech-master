import fs from "fs";

export const deleteLocalFile = (filePath) => {
  if (!filePath) return;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};