import babel from 'rollup-plugin-babel';

export default [
  {
    input: './src/js/index.js',
    output: {
      file: './dist/js/bootstrap.offcanvas.js',
      format: 'umd',
      name: 'BS.Offcanvas',
      exports: 'named',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup'],
      }),
    ],
  },
  {
    input: './src/js/element.js',
    output: {
      file: './dist/js/bootstrap.offcanvas.custom-element.js',
      format: 'umd',
      name: 'Offcanvas.Element',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        plugins: ['transform-custom-element-classes'],
        presets: ['es2015-rollup'],
      }),
    ],
  },
];
