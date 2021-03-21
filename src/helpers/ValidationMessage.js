export default function GetValidationMessage(error) {
  const validationInfo = {
    type: '',
    message: '',
  };
  switch (error) {
    case 'auth/invalid-email':
    case 'mail/invalid-email':
    case 'program/invalid-email':
      validationInfo.type = 'email';
      validationInfo.message = 'メールアドレスを正しく入力してください';
      break;
    case 'auth/email-already-in-use':
      validationInfo.type = 'email';
      validationInfo.message = 'メールアドレスが既に使われています';
      break;
    case 'auth/wrong-password':
      validationInfo.type = 'password';
      validationInfo.message = 'パスワードを正しく入力してください';
      break;
    case 'auth/weak-password':
      validationInfo.type = 'password';
      validationInfo.message = 'パスワードは6文字以上設定してください';
      break;
    case 'auth/user-not-found':
      validationInfo.type = 'default';
      validationInfo.message = 'アカウントが存在しません。メールアドレスとパスワードをご確認ください';
      break;
    case 'auth/user-mismatch':
      validationInfo.type = 'default';
      validationInfo.message = '現在のメールアドレスかパスワードが違います';
      break;
    case 'auth/user-disabled':
      validationInfo.type = 'default';
      validationInfo.message = '無効なユーザー情報です';
      break;
    case 'auth/too-many-requests':
      validationInfo.type = 'default';
      validationInfo.message = '複数回認証が失敗したため、時間を置いて再度お試しください';
      break;
    case 'mail/invalid-program':
      validationInfo.type = 'program';
      validationInfo.message = '番組を選択してください';
      break;
    case 'mail/invalid-content':
      validationInfo.type = 'content';
      validationInfo.message = '内容を入力してください';
      break;
    case 'template/invalid-templateName':
      validationInfo.type = 'templateName';
      validationInfo.message = 'テンプレート名を入力して下さい';
      break;
    case 'template/invalid-template':
      validationInfo.type = 'template';
      validationInfo.message = 'テンプレート内容を入力して下さい';
      break;
    case 'program/invalid-myProgram':
      validationInfo.type = 'myProgram';
      validationInfo.message = '番組名は必須です';
      break;
    default:
      validationInfo.type = 'default';
      validationInfo.message = 'エラーが発生しました。もう一度お試しください';
  }
  return validationInfo;
}
