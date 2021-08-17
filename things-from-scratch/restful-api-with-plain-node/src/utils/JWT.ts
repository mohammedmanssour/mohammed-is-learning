import { hash, base64UrlEncode, base64UrlDecode } from './index';

type Payload = {
  [key: string]: any;
};

export default class JWT {
  get header() {
    return {
      typ: 'JWT',
      alg: 'HS256',
    };
  }

  createSignature(header: string, payload: string): string {
    return hash(base64UrlEncode(header) + '.' + base64UrlEncode(payload));
  }

  make(payload: Payload): string {
    const body = {
      ...payload,
      exp: this.calcExpirationDate(),
    };

    const header = JSON.stringify(this.header);

    return (
      base64UrlEncode(header) +
      '.' +
      base64UrlEncode(JSON.stringify(body)) +
      '.' +
      base64UrlEncode(this.createSignature(header, JSON.stringify(body)))
    );
  }

  validate(token: string): boolean {
    const parts = token.split('.');

    let header = base64UrlDecode(parts[0]);
    let payload = base64UrlDecode(parts[1]);
    console.log({ header, payload });
    const signature = base64UrlDecode(parts[2]);

    const testSignature = this.createSignature(header, payload);

    if (testSignature !== signature) {
      return false;
    }

    const parsePayload = JSON.parse(payload);
    if (this.isExpired(parsePayload.exp)) {
      return false;
    }

    return true;
  }

  private isExpired(timestamp): boolean {
    const now = new Date().getTime() / 1000;

    return timestamp - now < 0;
  }

  private calcExpirationDate() {
    const now = new Date();
    // we'll set the expiration date to expire after 1 day
    now.setDate(now.getDate() + 1);

    return now.getTime() / 1000;
  }
}
