import babel from 'rollup-plugin-babel';

export default {
  input: './src/js/index.js',
  output: {
    file: './dist/js/bootstrap.offcanvas.js',
    format: 'umd',
    name: 'Bootstrap.Offcanvas',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
};
