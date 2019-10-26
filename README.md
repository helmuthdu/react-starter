# React Starter

### TL;DR

Step 1: Clone this repo

```
$ git clone https://github.com/helmuthdu/react-starter
$ cd nist-app
```

Step 2: Install

```sh
$ npm install
```

Step 3: Start

```sh
$ npm start
```

And you are done, as easy as 123.

# Basic

## Installation

### Prerequisite

You need to have Node.js installed.

[Instruction for installing NodeJS in Mac](http://lmgtfy.com/?q=install+nodejs+mac)

[Instruction for installing NodeJS in Window](http://lmgtfy.com/?q=install+nodejs+window)

## Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install
```

This installs the necessary packages to use the app

**That's it!**

### To run the app in Development Mode

```sh
$ npm start
```

Wait about 10 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:3000/`

If you see the landing page, it means you have set up everything successfully.

### List of NPM Commands

```sh
$ npm run start            # build and watch
$ npm run build            # build a minified production version
$ npm run server           # run compiled version locally
$ npm run analyse          # analyse package bundle
$ npm run test             # run test using Jest
$ npm run test:watch       # run test using Jest and watch
$ npm run test:coverage    # run test using Jest and show code coverage
$ npm run test:debug       # run test using Jest in debug mode
$ npm run test:e2e         # run test using cypress
$ npm run test:e2e:run     # run test using cypress in headed mode
$ npm run lint             # linting using ESLint
```

## Architecture: `components`, `containers` and `modules`

We adopted a split between stateless, reusable components called (wait for it...)
`components` and stateful parent components called `containers` and `pages`.

The `modules` group all related `components`, `containers` and `pages` into the same context.
Usually, `modules` should be independent and not share code between others `modules`.

Shared components, containers, utils, etc. should stay at the root level of the project

### Naming

For directories and filenames, kebab-case naming is recommended, but not enforced.

> Except `components` and `containers`, all files should have a suffix inherited from the parent folder (eg. `user.tsx`, `user-profile.page.tsx`, `user.api.ts`, `user.model.ts`, `user.util.ts`)

### Folder Structure

The entry point of your application is `client/pages`, it's basically a mapping between your `pages` to a `route`.

All your code lives in folder `client`

```
  -- src/
    -- api/            --> all api requests
    -- assets/         --> all direct imported assets
    -- component/      --> all share components
    -- context/        --> all share context
    -- layouts/        --> all share layouts
    -- models/         --> all share models
    -- modules/        --> all modules
      __name__         --> module name
        -- api/        --> all api requests
        ...            // same as root structure
        -- routes/      --> all routes (pages)
    -- routes/          --> all routes (pages)
    -- static/         --> all static files
    -- styles/         --> all share styles
    -- utils/          --> all non JSX utility
```

- For `__tests__/` folder, it is covered at [Writing Unit Test](#writing-unit-test) section

## Styling

A **SCSS Module** is a SCSS file in which all class names and animation names are scoped locally by default. All URLs (`url(...)`) and `@imports` are in module request format (`./xxx` and `../xxx` means relative, `xxx` and `xxx/yyy` means in modules folder, i. e. in `node_modules`).

SCSS Modules compile to a low-level interchange format called ICSS or [Interoperable CSS](https://github.com/css-modules/icss), but are written like normal CSS files:

```scss
/* style.scss */
.name {
  color: green;
}
.very-long-name {
  color: green;
}
```

When importing the **SCSS Module** from a JS Module, it exports an object with all mappings from local names to global names.

```js
import styles from './style.scss'
// import { className } from "./style.scss";

element.innerHTML = '<div class="' + styles.className + '">'
```

### Naming

For local class names, kebab-case naming is recommended, but not enforced.

> The webpack module will automatically remap the names for more straightforward use in the code (eg. instead of `style['class-name']`) you can use `style.className`.

Using these name conventions makes more comfortable to find a component in inspect mode because they reflect the component name and the class name (eg. `component-name__class-name`) similar to the B.E.M. style

### Exceptions

`:global` switches to global scope for the current selector respective identifier. `:global(.xxx)` respective `@keyframes :global(xxx)` declares the stuff in parenthesis in the global scope.

Similarly, `:local` and `:local(...)` for local scope.

If the selector is switched into global mode, global mode is also activated for the rules. (This allows us to make `animation: abc;` local.)

Example: `.localA :global .global-b .global-c :local(.localD.localE) .global-d`

## Writing Unit Test

We are using [Jest](https://jestjs.io/) and [React-Testing-Library](https://github.com/testing-library/react-testing-library) for unit testing.

In order to add unit test, the current setup requires you to put your test under `__tests__` directory, and suffix the filename with `spec` or `test`.

For example, `my-fancy-component.test.js` or `whatever_folder/another-component.spec.js`.

## QA

- **How to add javascript unit test ?**
  - All React JS test are under \_\_tests\_\_ directory and this tool will find all the test, you don't need to do anything besides putting your test in, but please use a structure that mimics the source location that you are testing, or it will create confusion.

- **What is B.E.M style ?**
  - B.E.M is short for `Block, Element, Modifier` and is a naming convention for classes in HTML and CSS. Its goal is to help developers better understand the relationship between the HTML and CSS and make our codebase more maintainable.
