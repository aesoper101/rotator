import path from "path";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";

import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import auto from "@rollup/plugin-auto-install";

import pkg from "../package.json";

import scss from "rollup-plugin-scss";

const projectRoot = path.resolve(__dirname, "..");

const external = ["vue"];

export default [
  {
    input: path.resolve(projectRoot, "components/index.ts"),
    output: {
      format: "es",
      file: pkg.module
    },
    plugins: [
      auto(),
      nodeResolve(),
      scss({ output: path.resolve(projectRoot, "dist/style/bundle.css") }),
      vue({
        target: "browser",
        css: false,
        exposeFilename: false
      }),

      typescript({
        tsconfigOverride: {
          include: ["components/**/*", "src/vue-shim.d.ts"],
          exclude: ["node_modules", "packages/**/__tests__/*"]
        },
        abortOnError: false
      }),

      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: pkg.browserslist
            }
          ],
          ["@babel/preset-typescript"]
        ],
        babelHelpers: "runtime",
        exclude: ["node_modules/**"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        comments: false,
        sourceMap: false
      }),
      commonjs(),
      terser()
    ],
    external
  }
];
