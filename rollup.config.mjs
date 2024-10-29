import svelte from 'rollup-plugin-svelte-hot';
import Hmr from 'rollup-plugin-hot'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { spassr } from 'spassr'
import getConfig from '@roxi/routify/lib/utils/config'
import autoPreprocess from 'svelte-preprocess'
import postcssImport from 'postcss-import'
import { injectManifest } from 'rollup-plugin-workbox'
import { mdsvex } from "mdsvex";
import smartAsset from "rollup-plugin-smart-asset";
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import pkg from 'fs-extra';
const { copySync, removeSync } = pkg;

const { distDir } = getConfig() // use Routify's distDir for SSOT
const assetsDir = 'assets'
const buildDir = `dist/build`
const isNollup = !!process.env.NOLLUP
const production = !process.env.ROLLUP_WATCH;

// clear previous builds
removeSync(distDir)
removeSync(buildDir)

const serve = () => ({
    writeBundle: async () => {
        const options = {
            assetsDir: [assetsDir, distDir],
            entrypoint: `${assetsDir}/__app.html`,
            script: `${buildDir}/main.js`
        }
        spassr({ ...options, port: 3000 })
        spassr({ ...options, ssr: true, port: 5005, ssrOptions: { inlineDynamicImports: true, dev: true } })
    }
})
const copyToDist = () => ({ writeBundle() { copySync(assetsDir, distDir) } })

const config = {
    preserveEntrySignatures: false,
    input: [`src/main.js`],
    output: {
        sourcemap: true,
        format: 'esm',
        dir: buildDir,
        // for performance, disabling filename hashing in development
        chunkFileNames:`[name]${production && '-[hash]' || ''}.js`
    },
    onwarn: (warning, handler) => {
        const ignoredWarnings = [
          'CIRCULAR_DEPENDENCY',
        ];

        if (!ignoredWarnings.includes(warning.code)) handler(warning)
    },
    plugins: [
        svelte({
            dev: !production, // run-time checks      
            css: css => css.write(`bundle.css`),
            hot: isNollup,
            extensions: [".svelte", ".svx", ".html"],
            preprocess: [
                mdsvex(),
                autoPreprocess({
                    postcss: { plugins: [postcssImport()] },
                    defaults: { style: 'scss' },
                    scss: {
                      prependData: "@import 'assets/styles/variables.scss';",
                      includePaths: ["assets/styles", "node_modules"],
                    }
                })
            ],
            onwarn: (warning, handler) => {
                const ignoredWarnings = [
                  'a11y-media-has-caption',
                ];

                if (!ignoredWarnings.includes(warning.code)) handler(warning)
            }
        }),
        json(),
        smartAsset({
          url: "copy",
          assetsPath: "images",
          publicPath: "/build/images/",
          useHash: true,
          extensions: [".svg", ".gif", ".png", ".jpg", ".mp3", ".csv"], 
        }),
        resolve({
            browser: true,
            dedupe: importee => !!importee.match(/svelte(\/|$)/)
        }),
        commonjs(),
        production && terser(),
        !production && !isNollup && serve(),
        !production && !isNollup && livereload(distDir),
        !production && isNollup && Hmr({ inMemory: true, public: assetsDir, }),
        {
            transform: code => ({
                code: code.replace('process.env.NODE_ENV', `"${process.env.NODE_ENV}"`),
                map: { mappings: '' }
            })
        },
        replace({
          'process.env.NODE_ENV': `"${production ? 'production' : 'development'}"`,
          preventAssignment: true
        }),
        injectManifest({
            globDirectory: assetsDir,
            globPatterns: ['**/*.{js,css,svg}', '__app.html'],
            swSrc: `src/sw.js`,
            swDest: `dist/serviceworker.js`,
            maximumFileSizeToCacheInBytes: 10000000, // 10 MB,
            mode: 'production'
        }),
        production && copyToDist(),
    ].filter(Boolean),
    watch: {
        clearScreen: false,
        buildDelay: 100,
    }
}

export default config; 