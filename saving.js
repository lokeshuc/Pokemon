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

// function to grab pokemon stats from the object created by 'fetchPokemon' and save it into folder

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

/* 
This fetches the all the info about the pokemon

savePokemonStats("mew", pokemon.stats); 
*/

// // console.log("file can't be created");

/* ~~Function to save pokemon artwork into folder ~~*/

const savePokemonArtwork = async (foldername, pokemonSpritesObject) => {
  const url =
    pokemonSpritesObject.sprites.other["official-artwork"].front_default;
  console.log(url);

  /* ---creating a folder and file inside it--- */
  await createFolder(foldername);
  const filepath = path.join(process.cwd(), foldername, "artwork.png");

  /* --fetching image from the url and saving it into file--- */
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(arrayBuffer));
};

/* **Function to save pokemon sprites */

const savePokemonSprites = async (foldername, pokemonSpritesObject) => {
  let spritePromise = [];
  let spriteNames = [];

  for (const [key, value] of Object.entries(pokemonSpritesObject.sprites)) {
    if (key === "other" || key === "versions" || value === null) continue;

    // key and value are stored in the array
    spriteNames.push(key);
    spritePromise.push(fetch(value).then((res) => res.arrayBuffer()));
  }
  // wait till all the values are resolved into array buffer
  spritePromise = await Promise.all(spritePromise);

  // create folder
  await createFolder(foldername);
  for (let i = 0; i < spritePromise.length; i++) {
    const filepath = path.join(
      process.cwd(),
      foldername,
      `${spriteNames[i]}.png`
    );

    await fs.writeFile(filepath, Buffer.from(spritePromise[i]));
  }
};

const pokemon = await fetchPokemon("mew");

savePokemonSprites("mew", pokemon);
