# en_vocabulary_learning
英単語学習を効率化できるアプリです。

## URL
### フロントエンドURL
https://en-vocabulary-learning.netlify.app

### バックエンドURL
https://en-vocabulary-learning-api.herokuapp.com

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
      - 英英辞書の外部API([WordsAPI](https://www.wordsapi.com))と連携し、単語それぞれの定義と用法を複数取得し、登録します。
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
https://user-images.githubusercontent.com/56663358/174016767-f7c95fc8-7454-4429-813b-54c0ee56db89.mov
