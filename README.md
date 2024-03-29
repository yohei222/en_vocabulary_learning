# 英単語学習アプリ
英単語学習を効率化できるアプリです。

## URL, README一覧
### アプリURL(フロントエンドURL)
- URL: https://en-vocabulary-learning.netlify.app
- [フロントエンドREADME](https://github.com/yohei222/en_vocabulary_learning/blob/master/frontend/README.md)

### APIエンドポイント(バックエンドURL)
- URL: https://en-vocabulary-learning-api.herokuapp.com
- [バックエンドREADME](https://github.com/yohei222/en_vocabulary_learning/blob/master/backend/README.md)

## 機能一覧
### 認証関連
- サインイン
- ログイン
- ログアウト

### メイン機能(英単語関連)
- 検索機能
- 登録・更新機能
  - 登録内容
    - 英単語
    - 日本語訳
    - 理解度
    - メモ
    - 英単語の用法
      - 英英辞書の外部API([WordsAPI](https://www.wordsapi.com))と連携し、単語が持つすべての定義と、それぞれの定義での用法を取得し、登録します。
    - 作成日時
    - 更新日時    
- 削除・一括削除機能
- 発音機能
- 単語の理解度のみを更新できる機能
- ソート機能
  - 以下の条件でソートが可能です
    - 理解度
    - アルファベット
    - 作成日
    - 更新日時

## サンプル動画
https://user-images.githubusercontent.com/56663358/174020323-32790d09-352d-48a4-a44d-5afa8f510957.mov

### Herokuについて(メモ)
再度APIを動作させるためには、Herokuのlow-cost-plansに課金する必要があります。
https://blog.heroku.com/new-low-cost-plans

