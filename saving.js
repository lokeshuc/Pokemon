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

const savePokemonStats = async (PokemonStatsObject) => {
  let statsString = "";
  for (const stat of PokemonStatsObject) {
    // console.log(stat);
    statsString += `${stat.stat.name} : ${stat.base_stat} \n`;
  }
  console.log(statsString);
};

const pokemon = await fetchPokemon("pikachu");
savePokemonStats(pokemon.stats);
