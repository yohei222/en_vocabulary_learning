import React from 'react'
import { VocabularyContext, useVocabularyContext } from 'contexts/VocabularyContext';
import VocabularyListTable from './VocabularyListTable';
import VocabularyCreate from './VocabularyCreate';
import VocabularyUpdate from './VocabularyUpdate';
import VocabularyBulkDelete from './VocabularyBulkDelete';
import VocabularySearchField from './VocabularySearchField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { jaTranslate } from "locales/i18n";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '88%',
      padding: '0px 20px',
      margin: '0 auto',
      marginTop: '20px',
    },
  })
);

const VocabulariesIndex = (): JSX.Element => {
  const ctx = useVocabularyContext();
  const classes = useStyles();

  return (
    <VocabularyContext.Provider value={ctx}>
      <div className={classes.root}>
        <h1>{jaTranslate('appName')}</h1>
        <VocabularySearchField />
        {/* todo 詳細モーダルの改善 */}
        {/* material uiから発音アイコンを取ってくる */}
        {/* 単語詳細モーダルのUIを整える */}
        {/* todo アプリにアイコン画像とタイトルを渡す */}
        {/* todo 発音ボタンをテーブルのカラムに追加する */}
        {/* todo 理解度別にrowの背景を変えれる？試してみる */}
        {/* todo リファクタリング(jaTranslateにする, useMemoに変更する、など) */}
        {/* todo readmeの充実→qiitaに記事執筆？ */}

        {/* memo
        要望がありそうな機能
        excelでのimport, export
        単語一括登録機能 */}
        <VocabularyBulkDelete />
        <VocabularyCreate />
        <VocabularyUpdate />
        <VocabularyListTable />
      </div>
    </VocabularyContext.Provider>
  )
}

export default VocabulariesIndex;
