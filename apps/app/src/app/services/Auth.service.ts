export class AuthService {
  static isUserLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  static getAccessToken() {
    const cookies = this.getCookies();
    return cookies['accessToken'];
  }
  static getCookies(): { [key: string]: string } {
    const cookies = document.cookie ? document.cookie.split(';') : [];
    return cookies
      .map((cookie) => cookie.split('='))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );
  }
}
