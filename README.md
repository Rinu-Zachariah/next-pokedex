# next-pokedex

Server-side Pokedex built with Next.js, Typescript, Tailwind CSS, modular CSS, Jest snapshots and plop-based code generators

## Features

**SSR Pokelist**: 
Fetches Pokemon from [PokeApi](https://pokeapi.co/) with server-side pagination and server side filtering
**Pokemon Details**: 
On click of any row, a modal opens up wit Pokemon details(stats, ability, etc)
- Shiny/normal sprite toggle in modal
**Clean Code Structure**:
Feature-first modular architecture for easy scaling and team collaboration
**CSS Modules**:
Scoped, maintainable styles - no global css conflicts
**Testing**:
Ready to use snapshot and unit test setup with Jest
**Automated Code Generation**:
plop based scaffolding for components, Redux Logic and more
**Evolution Trigger table**

## Getting started

**Requirements**
- Node.js 18 +
- Yarn or npm

**Tech Stack**
- Next.js (App Router, SSR)
- React
- Tailwind CSS
- Shadcn
- next-themes (Theme switching)
- tanstack Tables (Flexible tables)
- Pokeapi
- plop (scaffolding/generators)
- Jest & RTL
- Vercel (deployment/hosting)

**1. Clone the repo**
git clone https://github.com/Rinu-Zachariah/next-pokedex.git
cd next-pokedex

**2. Install dependencies**
npm install
-- or
yarn install

**3. Start Development server**
yarn dev
-- or 
npm run dev
# Runs on http://localhost:3000

**4. Code Generation**
This project use Plop for automated, menu driven code scaffolding

# To generate a new file :
yarn generate
-- or
npm run generate

You will be prompted to select :
>> Component'
>> Redux State
>> Redux Saga
>> Selector

Enter the name and (optional) directory. The generator will scaffold:
.tsx (React component) or .ts(for other types)
.css and .test.tsx (for components types)

**5. Testing**
Tests are located next to each component
Run all tests with
yarn test
-- or
npm test

Snapshot files are automatically generated and updated by Jest(__snapshots__ directories).

For coverage run :
npm test -- -coverage

**6. Bundle Analysis**
To inspect the app's JS bundle and to optimize, please run the command: 
npm run analyze

This will generate an interactive bundle analysis report.
This can be used to identify large dependencies or unnecessary code, making the app faster and more efficient.


## Environment Variables
Api Urls and secrets are stored in environment variables.
Create a 'env.local' file at the project root.

**Highlights**
- Semantic HTML and ARIA labels
- Automatic code splitting and minification
- Bundle analysis 
- Responsive 

**Deployed Version**
https://next-pokedex-two.vercel.app/ : Vercel

## Credits
- Pokeapi for Pokemon Data and sprites
- shadcn for UI components

## Author
Rinu Zachariah