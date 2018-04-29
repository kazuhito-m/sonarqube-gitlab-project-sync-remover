export default class ConoleApplication {
  public run(argv: string[]) {
    console.log("引数数:" + argv.length);
    for (var i = 0; i < argv.length; i++) {
      console.log("argv[" + i + "] = " + argv[i]);
    }
  }
}
