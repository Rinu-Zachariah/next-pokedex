const fs = require('fs');
const path = require('path');

module.exports = plop => {
  plop.setPrompt('directory', require('inquirer-directory'));

  plop.setGenerator('main', {
    description: 'Main code generator',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to generate?',
        choices: [
          { name: 'Component', value: 'component' },
          { name: 'Redux State', value: 'state' },
          { name: 'Redux Saga', value: 'saga' },
          { name: 'Selector', value: 'selector' }
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name (e.g. PokemonTable or pokemon):',
      },
      {
        type: 'directory',
        name: 'directory',
        message: 'Choose the target folder',
        basePath: './app',
      }
    ],
    actions: data => {
      const { type, directory } = data;
      const dir = `app/${directory}`;
      const folder = `{{pascalCase name}}`;
      const actions = [];

      if (type === 'component') {
        actions.push(
          {
            type: 'add',
            path: `${dir}/${folder}/${folder}.tsx`,
            templateFile: 'app/templates/Component.tsx.hbs',
          },
          // {
          //   type: 'add',
          //   path: `${dir}/${folder}/${folder}.css`,
          //   templateFile: 'app/templates/Component.css.hbs',
          // }, 
          // Since we are using Tailwind, custom styles are not needed. When needed, uncomment this.
          {
            type: 'add',
            path: `${dir}/${folder}/${folder}.test.tsx`,
            templateFile: 'app/templates/Component.test.tsx.hbs',
          },
          {
            type: 'add',
            path: `${dir}/${folder}/index.ts`,
            templateFile: 'app/templates/Component.index.ts.hbs',
          }
        );
        actions.push({
          type: 'modify',
          path: `app/${directory}/index.ts`,
          skipIfNonexistent: true,
          transform: (indexContent, config) => {
            return indexContent;
          },
        });
        return actions;
      }
      if (type === 'state') {
        return [{
          type: 'add',
          path: `app/${directory}/{{camelCase name}}state.ts`,
          templateFile: 'app/templates/state.ts.hbs',
        }];
      }
      if (type === 'saga') {
        return [{
          type: 'add',
          path: `app/${directory}/{{camelCase name}}Saga.ts`,
          templateFile: 'app/templates/saga.ts.hbs',
        }];
      }
      if (type === 'selector') {
        return [{
          type: 'add',
          path: `app/${directory}/{{camelCase name}}Selectors.ts`,
          templateFile: 'app/templates/selectors.ts.hbs',
        }];
      }
      return [];
    }
  });
};
