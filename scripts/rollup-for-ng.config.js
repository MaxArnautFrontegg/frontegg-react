import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ts from 'rollup-plugin-typescript2';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';
import transformTypesAlias from './rollup.transform-types-alias';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json')));
const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tsconfig.json')));
const distFolder = path.join(process.cwd(), `./dist/`);
const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  replace({
    __BUILD_ENV__: isProduction ? 'prod' : 'dev',
    __BUILD_DATE__: () => new Date(),
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.FRONTEGG_DEBUG_LEVEL': JSON.stringify(isProduction ? 'error' : 'debug'),
  }),
  json(),
  resolve({
    jsnext: true,
    browser: false,
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }),
  postcss({
    extensions: ['.css','.scss', '.sass'],
    minimize: true,
  }),
  commonjs({
    include: [/node_modules/],
    sourceMap: false,
  }),
  isProduction ? terser({
    ecma: '6', module: true,
  }) : progress(),
  ts({
    rollupCommonJSResolveHack: true,
    clean: true,
    tsconfig: `${process.cwd()}/tsconfig.json`,
    tsconfigOverride: {
      'target': 'ESNext',
      'module': 'ESNext',
    },
  }),
  transformTypesAlias({ distFolder, tsConfig }),
];

export default {
  input: './src/ng-index.ts',
  external: ['cron-parser'],//[...Object.keys(pkg.dependencies || []).filter(dep => internalDeps.indexOf(dep) === -1)],
  plugins,
  inlineDynamicImports: true,
  output: {
    sourcemap: !isProduction,
    dir: distFolder,
    format: 'esm',
    exports: 'named',
  },
};
