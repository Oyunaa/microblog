import React from 'react';
import { environment } from '../../environments/environment';

export function Login() {
  const clientId = environment.clientId;
  const scopes = 'user:email';
  const redirectUri = `${environment.apiUrl}/github/authorize`;
  const ghOauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scopes}$redirect_uri=${redirectUri}`;
  return (
    <div className="p-2 flex flex-col m-auto w-full lg:w-1/3 ">
      <h2 className="my-4 text-3xl uppercase font-black">Login</h2>
      <a
        href={ghOauthUrl}
        className="bg-black text-white w-full font-bold gap-2 flex items-center justify-center"
      >
        <img src="./assets/GitHub-Mark-32px.png" />
        <span>Login with Github</span>
      </a>
    </div>
  );
}
