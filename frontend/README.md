# 英単語学習アプリ フロントエンド

### アプリURL(フロントエンドURL)
- https://en-vocabulary-learning.netlify.app

## ディレクトリ設計(src配下)
### components
- 画面に表示するコンポーネントをこのディレクトリ配下に配置します。

### contexts
- グローバルに扱いたい値やメソッドを定義します。
  - `createContext, useContext`を用いて実装しています。

### lib/api
- APIへのアクセスを担当するclientを定義しています。

### locales
- 表示するテキストを日本語化するためのディレクトリです。
- `react-i18next`というライブラリを用いて実装しています。
  - `jaTranslate`という日本語変換のメソッドでは、translation.jsonに記載のキーに対応する日本語訳を返すように実装しています。

### path
- フロントエンドのパスや、バックエンドへのアクセスするパスを管理しています。

### routes
- アプリのルーティングを管理しています。
  - `react-router-dom`を用いて実装しています。
  - ログイン時とログインしていない時に応じてページへのアクセス制御を行うPrivateRouteを定義しています。

### utilities
- 複数の箇所から呼び出すメソッドを管理しています。

## 使用しているライブラリ例
### react hooks
- useContext, useState, useMemo, useEffectなどを使用しています。

### toast
- ログイン時やレコードの変更時にフラッシュメッセージを表示するために使用しています。

### @material-ui/core/styles
- スタイリングのために使用しています。

### @mui/material/Modal
- モーダルはmaterial uiを使用して実装しています。

### react-hook-form, yup
- それぞれフォームの入力値の管理やバリデーションで利用しています。

### moment.js
- 日時を日本時間の表示に変更するために利用しています。

### js-cookie
- cookieの取得、更新のために利用しています。

### @mui/x-data-grid
- 単語のテーブル表示に用いています。

### @mui/icons-material
- アイコンはmaterial uiのアイコンを使用しています。

## デプロイ
- netlifyを使用しています。
