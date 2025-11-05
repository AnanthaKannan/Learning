interface IShoutURL {
  getLongUrl(shortUrl: string): string;
  addLongUrl(longUrl: string): string;
}

class ShortURL implements IShoutURL {
  private readonly urlToCode = new Map<string, string>();
  private readonly codeToUrl = new Map<string, string>();
  private base: string;

  constructor(base: string) {
    this.base = base;
  }

  private generateShortUrlId(): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
      id += charset[Math.floor(Math.random() * charset.length)];
    }
    return id;
  }

  private isValidUrl(longUrl: string): boolean {
    try {
      new URL(longUrl);
      return true;
    } catch {
      return false;
    }
  }

  getLongUrl(shortUrl: string): string {
    const shortUrlId = shortUrl.replace(`${this.base}/`, "");
    if (this.codeToUrl.has(shortUrlId)) {
      return this.codeToUrl.get(shortUrlId)!;
    }
    throw new Error("Invalid short url");
  }

  addLongUrl(longUrl: string): string {
    if (!this.isValidUrl(longUrl)) {
      throw new Error("Invalid long url");
    }

    if (this.urlToCode.has(longUrl)) {
      return this.urlToCode.get(longUrl)!;
    }

    let shortUrlId = this.generateShortUrlId();
    while (this.codeToUrl.has(shortUrlId)) {
      shortUrlId = this.generateShortUrlId();
    }

    this.urlToCode.set(longUrl, shortUrlId);
    this.codeToUrl.set(shortUrlId, longUrl);
    return `${this.base}/${shortUrlId}`;
  }
}

const shortUrl = new ShortURL("http://shout.url");
const sUrl = shortUrl.addLongUrl("https//google.com");
console.log(sUrl);
const lUrl = shortUrl.getLongUrl(sUrl);
console.log(lUrl);
