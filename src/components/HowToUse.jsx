import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from './Header';
import '../css/howToUse.css';

const HowToUse = () => (
  <>
    <Header />
    <div className="bg_color" />
    <div className="howToUse_wrap">
      <Container maxWidth="sm">
        <h1 className="howToUse_title text-center">使い方</h1>
        <div className="howToUse_items">
          <Box m={4}>
            <h2 className="howToUse_item_title">○投稿する</h2>
            <ul className="howToUse_item_texts">
              <li className="howToUse_item_text">
                <Link to="/form" className="howToUse_link">こちらのフォーム</Link>
                に入力することで、ラジオ番組へメールを送ることができますできます。
              </li>
              <li className="howToUse_item_text">「ユーザー情報をセット」では、アカウント作成時に登録したユーザー登録をセットすることができますできます。</li>
              <li className="howToUse_item_text">
                マイ番組を
                <Link to="/myProgram" className="howToUse_link">設定</Link>
                することで、デフォルトで登録されているラジオ番組以外の自分がよく聴くラジオ番組を設定することができますできます。
              </li>
              <li className="howToUse_item_text">
                テンプレを
                <Link to="/template" className="howToUse_link">設定</Link>
                することで、オリジナルの投稿内容のフォーマットを利用することができますできます。
              </li>
            </ul>
          </Box>
          <Box m={4}>
            <h2 className="howToUse_item_title">○未送信のメール</h2>
            <ul className="howToUse_item_texts">
              <li className="howToUse_item_text">フォームの「途中保存」を押すことで、入力した情報を下書きとして保存することができます。</li>
              <li className="howToUse_item_text">途中保存した情報は、削除しない限り投稿後も残るので、不要になった場合は削除アイコンを押してください。</li>
            </ul>
          </Box>
          <Box m={4}>
            <h2 className="howToUse_item_title">○過去の投稿</h2>
            <ul className="howToUse_item_texts">
              <li className="howToUse_item_text">投稿したメールを番組別に見ることができます。</li>
            </ul>
          </Box>
          <Box m={4}>
            <h2 className="howToUse_item_title">○番組表</h2>
            <ul className="howToUse_item_texts">
              <li className="howToUse_item_text">当日分の各ラジオ局の放送番組を確認することができます。</li>
              <li className="howToUse_item_text">「公式HPへ」を押すと、各ラジオ番組の公式HPへいきます。</li>
            </ul>
          </Box>
          <Box m={4}>
            <h2 className="howToUse_item_title">○設定</h2>
            <ul className="howToUse_item_texts">
              <li className="howToUse_item_text">「ユーザー情報を変更」で、アカウント登録時に設定したユーザー情報を編集することができます。</li>
              <li className="howToUse_item_text">「メールアドレスとパスワードを変更」で、設定してあるメールアドレスとパスワードを変更することができます。変更後は一度ログイン画面に戻ります。</li>
              <li className="howToUse_item_text">「テンプレ」で、投稿内容のフォーマットをテンプレとして作成することができます。</li>
              <li className="howToUse_item_text">「マイ番組」で、自分がよく使う番組を設定することができます。番組名とメールアドレスは必須項目です。</li>
            </ul>
          </Box>
        </div>
      </Container>
    </div>
  </>
);

export default HowToUse;
