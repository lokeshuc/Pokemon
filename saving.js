import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

// 1. function to create folder in current working directory

const createFolder = async (folderName) => {
  const currentPath = process.cwd();
  const folderpath = path.join(currentPath, folderName);
  try {
    await fs.access(folderpath);
  } catch {
    fs.mkdir(folderpath);
  }
};

// 2. function to grab pokemon stats from the object created by 'fetchPokemon' and save it into folder

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

/* ~~3. Function to save pokemon artwork into folder ~~*/

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

/* ** 4. Function to save pokemon sprites */

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

/* ---combining checkbox with their options---- */

const parseOptions = async (pokemonObject, optionsObject) => {
  // grab options
  const options = optionsObject.INFO;

  // grab pokemon name
  const pokemonName = pokemonObject.name;

  if (options.include("Stats")) {
    await savePokemonStats(pokemonName, pokemonObject.stats);
  }

  if (options.include("Sprites")) {
    await savePokemonSprites(pokemonName, pokemonObject);
  }

  if (options.include("Artwork")) {
    await savePokemonArtwork(pokemonName, pokemonObject);
  }
};

export { parseOptions };
