# UI-Schema Demo w/ Material-UI

[![Github actions Build](https://github.com/ui-schema/demo-cra/actions/workflows/blank.yml/badge.svg)](https://github.com/ui-schema/demo-cra/actions)

Simple demo project for [@ui-schema/react](https://github.com/ui-schema/ui-schema) with [@mui](https://mui.com).

Files:

- [src/components/DemoEditor.jsx](./src/components/DemoEditor.jsx) demo UI-Schema form
- [src/components/LocalStorageForm.jsx](./src/components/LocalStorageForm.jsx) UI-Schema form using `localStorage` to persist data
- [src/App.jsx](./src/App.jsx) setup `binding` and `UIMetaProvider`
- [src/t.jsx](./src/t.jsx) dictionary setup

Run on [CodeSandbox](https://codesandbox.io/s/github/ui-schema/demo-cra/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.jsx) or [StackBlitz](https://stackblitz.com/github/ui-schema/demo-cra?file=%2Fsrc%2FApp.jsx).

Explore more:

- [Quick Start](https://ui-schema.bemit.codes/quick-start?ds=mui)
- [Core Project](https://github.com/ui-schema/ui-schema)
- [Advanced Examples in TypeScript](https://github.com/ui-schema/demo-ts)

## Setup

Install dependencies:

```shell
npm i
```

Start dev server:

```shell
npm start
```

Create bundle:

```shell
npm run build
```

For tests first install a playwright browser:

```shell
npx playwright install chromium --with-deps
```

Then run tests:

```shell
npm test
```

Or run tests in watch mode:

```shell
npm run tdd
```
