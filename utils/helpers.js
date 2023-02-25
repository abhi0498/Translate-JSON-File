import { readFileSync, writeFileSync } from "fs";
import languagesJson from "../assets/languages.json" assert { type: "json" };

export function readJSON(value) {
  const a = readFileSync(value);
  return JSON.parse(a);
}

export function writeFile(finalJson, destinationPath) {
  writeFileSync(destinationPath, JSON.stringify(finalJson, null, 2));
  console.log(`\x1b[32m%s\x1b[0m`, `File written to ${destinationPath}`);

  console.log(
    `\x1b[32m%s\x1b[0m`,
    "Thank you for using this package 🤗. If you faced any issues, please raise an issue on https://github.com/abhi0498/Translate-JSON-File.git"
  );
}

export function getLocale(language) {
  return languagesJson[language] || language;
}

export function flatten(object, addToList, prefix) {
  Object.keys(object).map((key) => {
    if (object[key] === null) {
      addToList[prefix + key] = "";
    } else if (object[key] instanceof Array) {
      for (i in object[key]) {
        flatten(object[key][i], addToList, prefix + key + "." + i);
      }
    } else if (
      typeof object[key] == "object" &&
      !object[key].toLocaleDateString
    ) {
      flatten(object[key], addToList, prefix + key + ".");
    } else {
      addToList[prefix + key] = object[key];
    }
  });
  return addToList;
}
