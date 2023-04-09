// this is to create prompt/checkbox/list
import inquirer from "inquirer";
import { parseOptions } from "./saving.js";

// 1. Prompt for pokemon
const Pokemon = async () => {
  return await inquirer.prompt({
    type: "input",
    name: "Pokemon_name",
    message: "What's your Pokemon name: ",
  });
};

const pokemonName = async () => {
  const questions = await Pokemon();
  console.log(`Your pokemon name is: ${questions.Pokemon_name}`);
};

// 2. checkbox

const promptForDownload = async () => {
  return await inquirer.prompt({
    type: "checkbox",
    message: "Pokemon info to download",
    name: "INFO",
    choices: [
      {
        name: "Stats",
      },
      {
        name: "Sprites",
      },
      {
        name: "Artwork",
      },
    ],
  });
};

// 3. continue
const promptToContinue = async () => {
  return await inquirer.prompt({
    type: "list",
    name: "CHOICES",
    message: "Would you like to search for another Pokemon",
    choices: ["Yes", "No"],
  });
};

// 4. for fetching pokemon information

const fetchPokemon = async (pokemon_name) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch {
    console.log("Network Error!!");
  }
};

// 5. Loop until the user gives 'no' as ans in to search for another pokemon

const promptUser = async () => {
  while (1) {
    // ask for pokemon name and log it
    const pokemonName = await Pokemon();
    console.log(`your selected pokemon is ${pokemonName.Pokemon_name}`);

    // show checkbox
    const checkbox = await promptForDownload();
    // console.log(checkbox.INFO);

    // fetch pokemon info

    const pokemonInfo = await fetchPokemon(pokemonName.Pokemon_name);
    console.log(pokemonInfo.name);

    // use what is in these options to fetch the info

    await parseOptions(pokemonInfo, checkbox);

    // save them in the local disc

    // ask if they want to continue or not
    const loop = await promptToContinue();
    if (loop.CHOICES === "No") {
      break;
    }
  }
};

export { promptUser };
