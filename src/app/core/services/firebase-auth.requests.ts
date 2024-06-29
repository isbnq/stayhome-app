import { SignUpTypes, SignInTypes, RefreshTokenTypes } from "./firebase-auth.types";
import { ErrorWithCodeAndTypedMessage } from "src/utils/error";

class RequestError extends Error {}


export namespace SignUp {
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

  export type Response = SignUpTypes.Response;
  export class ResponseError extends ErrorWithCodeAndTypedMessage<SignUpTypes.ErrorMessage> {}

  export async function request(
    apiKey: string, args: Readonly<Pick<SignUpTypes.RequestBody, 'displayName' | 'email' | 'password'>>): Promise<Response> {
    const requestBody: SignUpTypes.RequestBody = {
      ...args, returnSecureToken: true
    }

    try {
      const response = await fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseObj = await response.json();

      if (response.ok) {
        return responseObj as SignUpTypes.Response;
      } else {
        const { error: { code, message }} = responseObj as SignUpTypes.ErrorResponse;
        throw new ResponseError(code, message);
      }
    } catch(error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new RequestError(JSON.stringify(error));
      }
    }
  }
}


export namespace SignIn {
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  export type Response = SignInTypes.Response;
  export class ResponseError extends ErrorWithCodeAndTypedMessage<SignInTypes.ErrorMessage> {}

  export async function request(
    apiKey: string, args: Readonly<Pick<SignInTypes.RequestBody, 'email' | 'password'>>): Promise<Response> {
    const requestBody: SignInTypes.RequestBody = {
      ...args, returnSecureToken: true
    }

    try {
      const response = await fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseObj = await response.json();

      if (response.ok) {
        return responseObj as SignInTypes.Response;
      } else {
        const { error: { code, message }} = responseObj as SignInTypes.ErrorResponse;
        throw new ResponseError(code, message);
      }
    } catch(error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new RequestError(JSON.stringify(error));
      }
    }
  }
}


export namespace RefreshToken {
  const url = 'https://securetoken.googleapis.com/v1/token';

  export type Response = RefreshTokenTypes.Response;
  export class ResponseError extends ErrorWithCodeAndTypedMessage<RefreshTokenTypes.ErrorMessage> {}

  export async function request(apiKey: string, refreshToken: string): Promise<Response> {
    const requestBody: RefreshTokenTypes.RequestBody = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }

    try {
      const response = await fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(requestBody).toString()
      });

      const responseObj = await response.json();

      if (response.ok) {
        return responseObj as RefreshTokenTypes.Response;
      } else {
        const { error: { code, message }} = responseObj as RefreshTokenTypes.ErrorResponse;
        throw new ResponseError(code, message);
      }
    } catch(error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new RequestError(JSON.stringify(error));
      }
    }
  }
}
