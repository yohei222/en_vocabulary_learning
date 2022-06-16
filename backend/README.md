# 英単語学習アプリ バックエンド

## APIエンドポイント(バックエンドURL)
https://en-vocabulary-learning-api.herokuapp.com

## ディレクトリ設計
### controller
- ルーティングファイル(routes.rb)からリクエストを受け取り、レスポンスを返します。

### finder
- 検索を責務としています。
  - controllerから検索パラメーターを受け取り、検索結果を返します。

### factory
- レコードの生成をします。
  - 生成までが責務であり、永続化はservice層で行います。

### services
- factoryによって生成されたレコードを永続化します。

### specification
- ドメイン層に属するディレクトリです。
- ビジネス要件と照らし合わせ、要件を満たしているかを判定します。

## 認証関連
- トークン認証関連のgemである`"devise_token_auth"`を用いて実装しました。
- サインイン・ログイン時に返されるレスポンスのheaderに含まれる`client, access-token, uid`をフロントエンドのcookieにて保持する方法でログインを実装しました。

## デプロイ
- デプロイはherokuを用いて行っています。

## ドメインモデル
- `rails-erd`というgemを用いてこちらの図を作成しました。
![ドメインモデル](https://user-images.githubusercontent.com/56663358/174021777-36e6dc60-82c1-400f-b6db-737e22533bcc.png)

