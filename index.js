import { chromium } from "playwright";
import lodash from "lodash";
import cliProgress from "cli-progress";

import configure from "./utils/configure.js";
import { flatten, getLocale, readJSON } from "./utils/helpers.js";

const translate = async (sourcePath, language) => {
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  let moduleEnJson;

  await configure();

  moduleEnJson = readJSON(sourcePath);

  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const engJson = flatten(moduleEnJson, [], "");
  let translatedJson = {};

  const totalItemsToTranslate = Object.keys(engJson).length;

  bar1.start(totalItemsToTranslate, 0);

  let completedCount = 0;

  await page.goto(
    `https://translate.google.com/?sl=auto&tl=${getLocale(
      language
    )}&op=translate`
  );

  await page.waitForSelector("text=English >> visible=true");

  await page.waitForTimeout(2000);

  let shouldClearPreviousInput = false;
  const paginatedJson = [];

  Object.keys(engJson).forEach((key, index) => {
    if (index % 50 === 0) {
      paginatedJson.push([]);
    }
    paginatedJson[paginatedJson.length - 1].push(key);
  });

  for (const pageKeys of paginatedJson) {
    if (shouldClearPreviousInput) {
      await page.getByRole("button", { name: "Clear source text" }).click();
    }

    const placeHolderText = Math.random().toString().substring(7).toUpperCase();

    const stringToTranslate =
      `${placeHolderText}   ` +
      pageKeys.map((key) => lodash.get(engJson, key)).join("\n\n"); //add a random string to get the translation

    await page
      .getByRole("combobox", { name: "Source text" })
      .fill(stringToTranslate);

    await page.getByRole("button", { name: "Copy translation" }).textContent(); //wait for the translation to be completed
    let string = await page
      .getByText(`${placeHolderText}`)
      .last()
      .textContent();

    string = string.replace(new RegExp(placeHolderText), ""); //remove the random string
    string = lodash.upperFirst(string); // capitalize the first letter

    completedCount += pageKeys.length;

    bar1.update(completedCount);

    string.split("\n\n").forEach((string, index) => {
      const key = pageKeys[index];
      lodash.set(translatedJson, key, string);
    });

    shouldClearPreviousInput = true;
  }

  const finalJson = {};
  for (const key in translatedJson) {
    if (Object.hasOwnProperty.call(translatedJson, key)) {
      const element = translatedJson[key];
      lodash.set(finalJson, key, element);
    }
  }

  await browser.close();

  bar1.stop();

  return finalJson;
};

export default translate;
