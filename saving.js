import fs from "fs/promises";
import path from "path";

const createFolder = async (folderName) => {
  const currentPath = process.cwd();
  const folderpath = path.join(currentPath, folderName);
  try {
    await fs.access(folderpath);
  } catch {
    fs.mkdir(folderpath);
  }
};

console.log(process.cwd());
createFolder("monu");
