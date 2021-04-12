# React 環境構築

React の開発環境構築にはいくつか方法があるが、  
一番イージーなのが ```create-reacp-app```コマンド。  
  
```npx create-react-app sample_app```とするだけで、  
一発で動く状態の React アプリができる。  
  
しかしカスタマイズ性が低いので、独自で環境構築できるようになりたかった。  
  
そこで、  
JavaScript のモジュールバンドラーであるWebpackを始めとし、  
コピペで使いまわし可能な React開発環境を作った。
***
### 使用技術
|技術|バージョン|
|:---:|:---:|
|React|17.0.1|
|TypeScript|4.1.5|
|Webpack|5.22.0|
|ESLint|7.2.0|
|Prettier|2.2.1|
***
### ディレクトリ構造
```
react-ts-webpack-eslint-prettier
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── Index.tsx
│   ├── app.module.css
│   ├── components
│   │   └── Test.tsx
│   ├── index.html
│   └── python_icon.jpg
├── tsconfig.json
├── typings.d.ts
└── webpack.config.js
```
***
### 使用方法
```
# パッケージインストール
npm i

# サーバー起動
npm start

http://localhost:9000
にアクセス

# ビルドする場合
# 開発モード
npm run dev

# 本番モード(コードを圧縮)
npm run build
```
