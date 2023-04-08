import fetch from "node-fetch";
import inquirer from "inquirer";

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

pokemonName();

/* inquirer.prompt(questions).then((answers) => {
  console.log(pokemonanswers);
});
 */
