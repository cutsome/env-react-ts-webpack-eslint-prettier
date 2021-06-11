//
// webpack はモジュールの依存関係を解決し、一つのjsファイルにまとめる。
// js以外のファイルは、「ローダー」がjsに変換。
//   css → js, file(jpeg, png) → js, ts → js
//
// webpack の処理
//   1. バンドル処理 → 一つにまとめる
//   2. 変換処理    → 一つにまとめる前に、js に
//   3. 出力処理    → 一つにまとめたファイルを出力
//
const path = require('path');
//
// バンドル先に、HTMLを自動で出力
//
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  //
  // エントリーポイント
  //
  entry: {
    app: './src/Index.tsx',
  },
  //
  // 出力先
  //
  output: {
    //
    // 出力先の絶対パス
    //
    path: path.resolve(__dirname, 'public'),
    //
    // [name]: エントリーポイント名
    //  - デフォルトは「main」
    //
    // [contenthash]: ハッシュ値
    //  - ブラウザキャッシュ対策
    //
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  //
  // ソースマップ
  //
  devtool: 'eval-cheap-module-source-map',
  //
  // 開発用サーバー設定
  //
  devServer: {
    port: 9000,
    //
    // どのディレクトリをロードするか
    //
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  //
  // ローダー設定
  //
  module: {
    //
    // ローダーごとのルール
    //
    rules: [
      {
        //
        // 適用するファイルの正規表現
        //
        test: /\.tsx?$/,
        exclude: /node_modules/,
        //
        // 適用するローダー
        // tsx, ts → js
        //
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        //
        // 適用するローダーの場合分け
        //
        oneOf: [
          {
            //
            // *.module.css は、CSS Modules として扱う
            // https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack/44228423#44228423
            //
            test: /\.module\.css$/,
            //
            // 複数ローダーを適用する場合、arrayで記載
            // index の大きい順に適用される (右から左に)
            //
            use: [
              //
              // CSS を単体でバンドルする
              //
              {
                loader: MiniCssExtractPlugin.loader,
                //
                // webpack 5 では、publicPathの指定が必要らしい
                // https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser
                //
                options: {
                  publicPath: ''
                }
              },
              {
                //
                // css → js
                //
                loader: 'css-loader',
                options: {
                  //
                  // CSS modules 設定を有効に
                  //
                  modules: true,
                  //
                  // css-loader の前に適用されるローダーの数
                  //
                  importLoaders: 1,
                  sourceMap: true,
                }
              },
            ],
          },
          {
            //
            // その他 CSS は<head>内に<style>として追加される
            //
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: ''
                }
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                },
              },
            ],
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp4|svg)$/,
        //
        // file → css
        //
        loader: 'file-loader',
        options: {
          //
          // [name]: 画像のファイル名
          // [ext] : 拡張子
          //
          name: '[name].[contenthash].[ext]',
          outputPath: 'images',
          publicPath: '/images',
        }
      },
    ],
  },
  //
  // モジュールの名前解決設定
  //
  resolve: {
    //
    // 解決される拡張子
    // from './sample.tsx' と書かず、
    // from './sample'     と書ける。
    //
    extensions: ['.tsx', '.ts', '.js'],
  },
  //
  // プラグイン
  //
  plugins: [
    //
    // 出力先を一度クリーンアップ
    //
    new CleanWebpackPlugin(),
    //
    // HTMLを自動出力
    // js や css のタグ追記も自動で
    //
    new HtmlWebpackPlugin({
      //
      // どのテンプレートを使うか
      //
      template: './src/index.html',
      filename: 'index.html',
    }),
    //
    // eslint-loader は 2020/10 ~ 非推奨
    // ロード時にコード検証する
    //
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      //
      // エラーの自動修正
      //
      fix: true,
    }),
    //
    // JS内にバンドルせず、CSSファイルを別で用意する
    //
    new MiniCssExtractPlugin({
      //
      // [name]: エントリーポイント名
      //
      filename: './[name].[contenthash].css',
    }),
		//
		// .env から REACT_APP_XXX 変数読込できるようにする
		//
		new Dotenv(),
  ],
  //
  // ファイル制限の設定
  //
  performance: {
    //
    // アセット: webpack から出力された個々のファイル
    // ファイルのバイト数を 512KB に引き上げる(df: 250KB)
    // 超えた場合は、パフォーマンス影響の Warning がでる
    //
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  //
  // ファイルの最適化(圧縮など)
  //
  optimization: {
    //
    // development モードでも圧縮する
    //
    minimize: true,
    minimizer: [
      //
      // JS の最適化
      //
      new TerserPlugin({
        //
        // ライセンスファイルを出力しない
        //
        extractComments: false,
        terserOptions: {
          //
          // 圧縮設定
          //
          compress: {
            //
            // console は消去する
            //
            drop_console: true,
          },
        },
      }),
      //
      // CSS 最適化
      //
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
    //
    // バンドルファイルの分割
    //  - 更新頻度の低い node_modules を逐一バンドルすると重い
    //  - バンドル先を分け、ブラウザキャッシュを利用する
    //
    splitChunks: {
      cacheGroups: {
        vendor: {
          //
          // 静的モジュールのみを対象に
          //
          chunks: 'initial',
          test: /node_modules/,
          //
          // バンドルファイルの [name] に
          //
          name: 'vendor',
        },
      },
    },
  },
};
