export class AuthService {
  static isUserLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  static getAccessToken() {
    const cookies = this.getCookies();
  //  console.log(cookies);

   // console.log(cookies['accessToken']);
    return cookies['accessToken'];
  }
  static getCookies(): { [key: string]: string } {
    const cookies = document.cookie ? document.cookie.split(';') : [];

    // console.log(cookies,"cookies")

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
