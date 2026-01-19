# coding-template-frontend

Gulp,Webpack で作ったフロントエンドの開発環境です。
使用言語は ejs,sass,javascript を想定。

## 使い方

### css・js のファイル名を書き換え

#### 下記のフォルダ名を変更

/src/assets/js/2024_1213_projectName.js
/src/assets/sass/2024_1213_projectName.scss

#### \_head.ejs の css・js を読み込んでいる箇所

```
<link rel="stylesheet" href="<%= CSS_PATH %>2024_1213_projectName.scss">
```

```
<script src="<%= JS_PATH %>2024_1213_projectName.js"></script>
```

#### package.json 　 build の NODE_IMAGE_PATH

buid 時に本番環境のパスに切り替わるようにします

```
"scripts": {
  "start": "NODE_ENV=development NODE_IMAGE_PATH='/assets/img/' gulp start",
  "build": "NODE_ENV=production NODE_IMAGE_PATH='/cms/img/usr/news/2025/12/springCollection/' gulp build" 👈 ココのパスを変更
},
```

### セットアップ

ローカルにプルしてターミナルを開き

`$ yarn install` or `$ npm install`

終わり！

### start と build

package.json の"scripts"に定義されているコマンドは２つだけです。

#### start

```
yarn start
or
npm run start
```

ローカルサーバーを立ち上げます。
ejs,sass,js ファイルを保存するとコンパイルされ/dist に htm,css,js ファイルが吐き出されます。
画像は jpeg,png,gif,svg は圧縮、webp はそのままで/dist へコピーされます。

#### build

```
yarn build
or
npm run build
```

プロダクションビルド。本番環境にアップする前にやってください。
/dist を削除した後、start と同じようにそれぞれのファイルがコンパイル or コピーされます。
また、圧縮や開発時のみ必要なコードの削除がされファイルが軽量化されます。

本番アップするファイルに合わせるため、
index.html・index_head.html の中身が書き換わっています。
またルート URL の指定は index.ejs の serverURL 変数で行ってください

要するに、サーバーアップ時は dist の中身をそのまま投げれば大丈夫です。

:::note alert
注意！！
/dist 以下に置いてあるファイルは build 時に削除されます。
また git にも反映されないため保存が効きません。基本的にこの中は触らないようにしてください。
:::

### /src 内ファイルの説明

- ejs
  html をテンプレート的に使えます。
  ファイルを保存すると/dist にファイル名.html の形式でコンパイルされます。
  モジュール化したい時はフォルダ・ファイル名の頭に"＿"をつけると、ページとしてはコンパイルされません。

- /assets
  - images
    画像などの置き場。画像は jpeg,png,gif,svg は圧縮、webp はそのままで/dist へコピーされます。
    webp 以外にもファイルを入れると/dist/assets/images にコピーされます。
  - sass
    css を分割できる。こちらもフォルダ・ファイル名の頭に"＿"をつけるとページとしてはコンパイルされません。
  - js
    webpack を導入したのでこちらもファイル分割が可能です。
    "\_"つけるとやはりモジュール扱いです。

### Swiper を利用する際の手順

```
## プロジェクトのルートに移動
$npm install swiper
```

index.js ファイルで swiper 読み込み

```
import Swiper from 'swiper/bundle';
```

`src/sass/_modules/`配下に、`_swiper.scss` を作成
`node_modules/swiper/swiper-bundle.min.css` の中身を丸っとコピーして、作成した`_swiper.scss`ファイルにペースト

src/sass/style.scss で swiper ファイルの読み込み

```
@use './_modules/_swiper';
```

======================================================================
↓↓↓↓↓↓↓↓ 使うだけならここからは読まなくて大丈夫です ↓↓↓↓↓↓↓↓
======================================================================

### 開発環境の各ファイルの説明

#### .gitignore

git で無視したいファイルを設定します。
デフォルトは/dist, /node_modules, .DS_Store, .vscode を無視。

#### gulpfile.mjs

gulp の設定ファイル。gulp5 で記述されています。
ES Modules（import・export）を使うため mjs ファイルになってます。
やっていることはざっくりまとめると下記になります。

- ejs,sass のコンパイル
- 画像の圧縮
- webpack の実行（webpack-stream を使用することで webpack の実行もこちらで制御してます）
- ローカルサーバーの立ち上げ
- start 時のファイル監視
- build 時の/dist ファイルの削除

#### webpack.config.mjs

webpack の設定ファイル。webpack5 で記述されています。
こちらも mjs ファイルになってます。webpack は javascript のバンドルをしています。
css・画像など入れたりできますが、今回は純粋に javascript だけです。
やっていることはざっくりまとめると下記になります。

- start, build 時に何をするかここで決めています。
- babel（js のマイナーチェンジ）
