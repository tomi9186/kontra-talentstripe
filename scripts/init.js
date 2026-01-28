#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Inicijaliziram WP Slice Starter projekt...\n');

// 1. Kreiranje strukture foldera
const folders = [
  'src/js',
  'src/styles/base',
  'src/styles/layout',
  'src/styles/components',
  'src/styles/bootstrap',
  'dist'
];

folders.forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
  console.log(`📁 Kreiran folder: ${folder}`);
});

// 2. Kreiranje SCSS datoteka
const scssFiles = {
  'src/styles/base/variables.scss': `// Varijable
$font-family-base: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
$font-size-base: 1rem;

// Boje
$primary: #0d6efd;
$secondary: #6c757d;
$success: #198754;
$danger: #dc3545;
$warning: #ffc107;
$info: #0dcaf0;

// Spacing
$spacer: 1rem;
`,

  'src/styles/base/mixins.scss': `// Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 576px) { @content; }
  } @else if $breakpoint == md {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == lg {
    @media (min-width: 992px) { @content; }
  } @else if $breakpoint == xl {
    @media (min-width: 1200px) { @content; }
  }
}
`,

  'src/styles/layout/header.scss': `// Header styles
.site-header {
  // dodaj stilove
}
`,

  'src/styles/layout/footer.scss': `// Footer styles
.site-footer {
  // dodaj stilove
}
`,

  'src/styles/layout/offcanvas.scss': `// Offcanvas styles
`,

  'src/styles/components/button.scss': `// Button styles
`,

  'src/styles/components/card.scss': `// Card styles
`,

  'src/styles/components/modal.scss': `// Modal styles
`,

  'src/styles/bootstrap/bootstrap-overrides.scss': `// Bootstrap overrides - uključi PRIJE bootstrap importa
// Primjer:
// $primary: #your-color;
// $body-bg: #fff;
`,

  'src/styles/bootstrap/bootstrap.scss': `// Bootstrap SCSS imports
@import "~bootstrap/scss/functions";
@import "../base/variables";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/maps";
@import "~bootstrap/scss/mixins";

// Core
@import "~bootstrap/scss/root";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/containers";
@import "~bootstrap/scss/grid";

// Components - uključi samo što trebaš
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/nav";
@import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/dropdown";
@import "~bootstrap/scss/modal";
@import "~bootstrap/scss/offcanvas";
@import "~bootstrap/scss/card";

// Utilities
@import "~bootstrap/scss/utilities";
@import "~bootstrap/scss/utilities/api";
`,

  'src/styles/main.scss': `// Main SCSS entry point

// Bootstrap (overrides moraju biti prvi)
@import "./bootstrap/bootstrap-overrides";
@import "./bootstrap/bootstrap";

// Base
@import "./base/variables";
@import "./base/mixins";

// Layout
@import "./layout/header";
@import "./layout/footer";
@import "./layout/offcanvas";

// Components
@import "./components/button";
@import "./components/card";
@import "./components/modal";
`
};

Object.entries(scssFiles).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content);
  console.log(`📄 Kreirana datoteka: ${filePath}`);
});

// 3. Kreiranje main.js
const mainJs = `// Main JS entry point
import '../styles/main.scss';

// Bootstrap JS (bundle uključuje Popper)
import 'bootstrap/dist/js/bootstrap.bundle';

// Custom JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('WP Slice Starter loaded');
});
`;

fs.writeFileSync('src/js/main.js', mainJs);
console.log('📄 Kreirana datoteka: src/js/main.js');

// 4. Kreiranje index.html
const indexHtml = `<!doctype html>
<html lang="hr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WP Slice Starter</title>
</head>
<body>

  <header class="site-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#">About</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="site-main">
    <div class="container py-5">
      <h1>WP Slice Starter</h1>
      <p>Ovdje ide Figma slice markup...</p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container py-4">
      <p>&copy; 2026 - WP Slice</p>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync('src/index.html', indexHtml);
console.log('📄 Kreirana datoteka: src/index.html');

// 5. Kreiranje webpack.config.js
const webpackConfig = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

const isProd = process.env.NODE_ENV === 'production';
const srcPath = path.join(__dirname, 'src');

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    hot: true,
    port: 8080,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: !isProd },
          },
          {
            loader: 'sass-loader',
            options: { 
              sourceMap: !isProd,
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: isProd ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    ...(isProd
      ? [
          new PurgeCSSPlugin({
            paths: glob.sync(srcPath + '/**/*', { nodir: true }),
            safelist: {
              standard: [
                'show', 'showing', 'hiding', 'hide',
                'collapsing', 'collapse', 'collapsed',
                'modal-backdrop', 'modal-open',
                'offcanvas-backdrop',
                'active', 'disabled', 'fade',
              ],
              deep: [
                /^modal/, /^offcanvas/, /^navbar/,
                /^dropdown/, /^collapse/, /^btn/,
                /^nav-/, /^carousel/, /^accordion/,
              ],
              greedy: [/data-bs-/],
            },
          }),
        ]
      : []),
  ],
};
`;

fs.writeFileSync('webpack.config.js', webpackConfig);
console.log('📄 Kreirana datoteka: webpack.config.js');

// 6. Kreiranje .gitignore
const gitignore = `node_modules/
dist/
.DS_Store
*.log
.env
`;

fs.writeFileSync('.gitignore', gitignore);
console.log('📄 Kreirana datoteka: .gitignore');

console.log('\n✅ Struktura projekta kreirana!');
console.log('\n📦 Instaliram npm pakete...\n');

// 7. Instalacija paketa
try {
  execSync('npm install -D webpack webpack-cli webpack-dev-server sass sass-loader css-loader html-loader mini-css-extract-plugin css-minimizer-webpack-plugin html-webpack-plugin purgecss-webpack-plugin glob cross-env', { stdio: 'inherit' });
  execSync('npm install bootstrap@5', { stdio: 'inherit' });
  console.log('\n✅ Paketi instalirani!');
} catch (error) {
  console.error('\n❌ Greška pri instalaciji paketa:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup završen!');
console.log('\nKorištenje:');
console.log('  npm run dev   - Pokreni dev server');
console.log('  npm run build - Napravi produkcijski build\n');
