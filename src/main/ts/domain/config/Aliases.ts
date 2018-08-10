export default class Aliases {
  private readonly aliases: {[key: string]: string};

  constructor(aliases: {[key: string]: string}) {
    this.aliases = aliases;
  }

  public static empty(): Aliases {
    return new Aliases({});
  }

  public aliasName(originName: string): string {
    if (originName in this.aliases) return this.aliases[originName];
    return originName;
  }
}