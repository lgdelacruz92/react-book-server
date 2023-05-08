import { Answers, PromptModule, createPromptModule } from "inquirer";

const prompt: PromptModule = createPromptModule();

prompt([
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
]).then((answers: Answers) => {
  console.log(`Hello, ${answers.name}!`);
});
