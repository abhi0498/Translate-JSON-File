#!/usr/bin/env node

import translate from "./index.js";

import inquirerPrompt from "inquirer-autocomplete-prompt";
import inquirer from "inquirer";
import { readJSON, writeFile } from "./utils/helpers.js";
import languagesJson from "./assets/languages.json" assert { type: "json" };
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const optionDefinitions = [
  {
    name: "help",
    alias: "h",
    type: Boolean,
    description: "Display this usage guide.",
  },
  {
    name: "input-file",
    type: String,
    description: "The input file json in English",
    typeLabel: "<files>",
  },
  {
    name: "output-file",
    type: String,
    description: "The output file path",
    typeLabel: "<file>",
  },
  {
    name: "language",
    type: String,
    description: "The language to translate to",
    typeLabel: "<lang>",
  },
];

const options = commandLineArgs(optionDefinitions);

const questionnaire = async () => {
  const allLanguages = Object.keys(languagesJson);

  const sourceAndLanguage = await inquirer.prompt([
    {
      type: "input",
      name: "sourcePath",
      message: "Enter source JSON file path (English)",
      default: "./appModule.json",
      validate: (value) => {
        try {
          readJSON(value);
          return true;
        } catch (error) {
          console.log(error);
          return "Please enter valid path";
        }
      },
    },
    {
      type: "autocomplete",
      name: "language",
      message: "Select language",
      source: async (answersSoFar, input = "") => {
        return allLanguages.filter((language) =>
          language.toLowerCase().includes(input.toLowerCase())
        );
      },
    },
  ]);
  return sourceAndLanguage;
};

const askDestinationPath = async () => {
  const destination = await inquirer.prompt([
    {
      type: "input",
      name: "destinationPath",
      message: "Enter destination JSON file path",
      default: "./appModule.json",
      validate: (value) => {
        try {
          return true;
        } catch (error) {
          console.log(error);
          return "Please enter valid path";
        }
      },
    },
  ]);
  return destination;
};

async function questionnaireFlow() {
  const { sourcePath, language } = await questionnaire();
  const finalJson = await translate(sourcePath, language);
  const { destinationPath } = await askDestinationPath();
  writeFile(finalJson, destinationPath);
}

const RED_COLOR = "\x1b[31m%s\x1b[0m";

const main = async () => {
  const inputFilePath = options["input-file"];
  const destinationFilePath = options["output-file"];
  const language = options.language;
  const isHelpCommand = options.help;

  if (!inputFilePath && !destinationFilePath && !language && !isHelpCommand) {
    await questionnaireFlow();
  } else {
    if (isHelpCommand) {
      const usage = commandLineUsage([
        {
          header: "Typical Example",
          content: `A simple example demonstrating typical usage.
           translate-json-file --input-file ./appModule.json --output-file ./appModule.json --language kn`,
        },
        {
          header: "Options",
          optionList: optionDefinitions,
        },
        {
          content:
            "Project home: {underline https://github.com/abhi0498/Translate-JSON-File.git}",
        },
      ]);
      console.log(usage);
    } else {
      if (!inputFilePath || !destinationFilePath || !language) {
        //red log
        console.error(
          RED_COLOR,
          "Please provide all the required options. For usage, run translate-json-file --help"
        );
        return;
      } else {
        const finalJson = await translate(inputFilePath, language);
        writeFile(finalJson, destinationFilePath);
      }
    }
  }
};

main();
