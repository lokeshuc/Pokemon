import fs from "fs/promises";
import path from "path";
import { fetchPokemon } from "./prompts.js";

//function to create folder in current working directory

const createFolder = async (folderName) => {
  const currentPath = process.cwd();
  const folderpath = path.join(currentPath, folderName);
  try {
    await fs.access(folderpath);
  } catch {
    fs.mkdir(folderpath);
  }
};

// function to create pokemon stats and save it into folder

const savePokemonStats = async (folderName, PokemonStatsObject) => {
  let statsString = "";
  for (const stat of PokemonStatsObject) {
    // console.log(stat);
    statsString += `${stat.stat.name} : ${stat.base_stat} \n`;
  }
  console.log(statsString);

  //   creating a folder

  await createFolder(folderName);

  //   creating a file in the folder and writing info in it

  const currentpath = process.cwd();
  const filePath = path.join(currentpath, folderName, "stats.txt");

  await fs.writeFile(filePath, statsString);
};

// const pokemon = await fetchPokemon("mew");
// savePokemonStats("mew", pokemon.stats);
// // console.log("file can't be created");
