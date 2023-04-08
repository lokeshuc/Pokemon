import fs from "fs/promises";
import path from "path";
import { fetchPokemon } from "./prompts.js";

const createFolder = async (folderName) => {
  const currentPath = process.cwd();
  const folderpath = path.join(currentPath, folderName);
  try {
    await fs.access(folderpath);
  } catch {
    fs.mkdir(folderpath);
  }
};

const savePokemonStats = async (folderName, PokemonStatsObject) => {
  let statsString = "";
  for (const stat of PokemonStatsObject) {
    // console.log(stat);
    statsString += `${stat.stat.name} : ${stat.base_stat} \n`;
  }
  console.log(statsString);

  //   creating a folder and storing the stats in it

  await createFolder(folderName);

  const currentpath = process.cwd();
  const filePath = path.join(currentpath, folderName, "stats.txt");

  await fs.writeFile(filePath, statsString);
};

const pokemon = await fetchPokemon("pikachu");
savePokemonStats("pikachu", pokemon.stats);
console.log("file can't be created");
