module.exports = {
  mode: 'production',
  entry: __dirname + "/src/main/ts/index.js", //ビルドするファイル
  output: {
    path: __dirname +'/dist', //ビルドしたファイルを吐き出す場所
    filename: 'bundle.js' //ビルドした後のファイル名
  }
};
