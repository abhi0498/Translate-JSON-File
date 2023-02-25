# Translate JSON File

[![npm](https://img.shields.io/npm/v/translate-json-file)](https://www.npmjs.com/package/translate-json-file)
[![GitHub issues](https://img.shields.io/github/issues/abhi0498/translate-json-file)](https://github.com/abhi0498/translate-json-file/issues)
[![GitHub license](https://img.shields.io/github/license/abhi0498/translate-json-file)](https://github.com/abhi0498/translate-json-file/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/abhi0498/translate-json-file)](https://github.com/abhi0498/translate-json-file/stargazers)

## Usage

### Install

```bash
 yarn add translate-json-file
```

### Help

```bash
 npx translate-json-file@latest --help
```

### Use with questionnaire

```bash
 npx translate-json-file@latest
```

### Use with command line arguments

```bash
 npx translate-json-file@latest --input-file <input-file> --output-file <output-file> --language <language>
```

### Use in package.json

```json
{
  "scripts": {
    "translate": "translate-json-file --input-file <input-file> --output-file <output-file> --language <language>"
  }
}
```

## Supported Languages

- Kannada
- French
- Spanish

## Supported Languages but not tested

- Afrikaans
- Irish
- Albanian
- Italian
- Arabic
- Japanese
- Azerbaijani
- Basque
- Korean
- Bengali
- Latin
- Belarusian
- Latvian
- Bulgarian
- Lithuanian
- Catalan
- Macedonian
- Chinese Simplified
- Malay
- Chinese Traditional
- Maltese
- Croatian
- Norwegian
- Czech
- Persian
- Danish
- Polish
- Dutch
- Portuguese
- English
- Romanian
- Esperanto
- Russian
- Estonian
- Serbian
- Filipino
- Slovak
- Finnish
- Slovenian
- Galician
- Swahili
- Georgian
- Swedish
- German
- Tamil
- Greek
- Telugu
- Gujarati
- Thai
- Haitian Creole
- Turkish
- Hebrew
- Ukrainian
- Hindi
- Urdu
- Hungarian
- Vietnamese
- Icelandic
- Welsh
- Indonesian
- Yiddish

### Caveats

- Tested for **Kannada**, **French** and **Spanish**. May not work for other languages.
  Please raise an issue if you find any.
- The translation is done using Google Translate. So, the quality of the translation
  depends on the quality of Google Translate.
- The translation is done using the `en` language. So, the translation may not be accurate
  for languages other than English.
