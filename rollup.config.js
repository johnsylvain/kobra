import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: pkg.source,
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.browser, format: 'umd' }
    ],
    name: 'kobra',
    plugins: [
      resolve(),
      commonjs({
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
  },
  {
    input: pkg.source,
    external: ['ms'],
    output: [{ file: pkg.module, format: 'es' }],
    name: 'kobra',
    plugins: [
      resolve(),
      commonjs({
        sourceMap: false
      }),
      uglify()
    ]
  }
];
