const config = {
    // This will lint and format Typescript and Javascript files
    // Runs linter first and then run prettier to format the files
    '**/*.(ts|tsx|js|jsx)': (filenames) => [
      'pnpm exec eslint --fix ' + filenames.map((file) => `"${file}"`).join(' '),
      'pnpm exec prettier --write ' + filenames.map((file) => `"${file}"`).join(' '),
    ],

    // This will Format MarkDown and JSON files
    '**/*.(md|json|html)': (filenames) => `pnpm exec prettier --write ${filenames.join(' ')}`,

    // This will format CSS and SCSS files
    '**/*.(css|scss)': (filenames) => `pnpm exec stylelint --fix ${filenames.join(' ')}`,
}

export default config;