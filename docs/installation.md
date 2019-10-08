# Installation

```bash
# Dependencies
yarn add kobra

# Dev dependencies
yarn add @babel/core @babel/preset-env @babel-transform-react-jsx @babel/plugin-transform-runtime --dev
```

Kobra uses JSX to construct the UI. In order for the JSX to be transpiled correctly, some configurations need to be made in a `.babelrc` file in the root of your project.

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["@babel/transform-react-jsx", { "pragma": "h" }],
    "@babel/plugin-transform-runtime"
  ]
}
```
