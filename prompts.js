import fetch from "node-fetch";
import inquirer from "inquirer";

// Prompt for pokemon
const Pokemon = () => {
  return inquirer.prompt({
    type: "input",
    name: "Pokemon_name",
    message: "What's your Pokemon name: ",
  });
};

const pokemonName = async () => {
  const questions = await Pokemon();
  console.log(`Your pokemon name is: ${questions.Pokemon_name}`);
};

// checkbox

function promptForDownload =async ()=>{
return await 
inquirer
  .prompt({
    type: "checkbox",
    message: "Pokemon info to download",
    name: "INFO ABOUT---",
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
  })
  
}