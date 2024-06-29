import { LiteralUnion } from "type-fest"


export namespace SignUpTypes {
  export type RequestBody = {
    email: string
    password: string
    displayName: string
    returnSecureToken: boolean
  }
  export type Response = {
    idToken: string
    email: string
    displayName: string
    refreshToken: string
    expiresIn: string
    localId: string
  }
  export type ErrorMessage = LiteralUnion<
  'EMAIL_EXISTS'  // The email address is already in use by another account.
  | 'OPERATION_NOT_ALLOWED'  // Password sign-in is disabled for this project.
  | 'TOO_MANY_ATTEMPTS_TRY_LATER'  // We have blocked all requests from this device due to unusual activity. Try again later.
  , string>

  export type ErrorResponse = {
    error: {
      code: number,
      message: ErrorMessage,
      status?: string
    }
  }
}

export namespace SignInTypes {
  export type RequestBody = SignUp.RequestBody

  export type Response = SignUpTypes.Response & {
    registered: boolean
  }

  export type ErrorMessage = LiteralUnion<
    'INVALID_LOGIN_CREDENTIALS'  // Wrong email or password
    | 'USER_DISABLED'  // The user account has been disabled by an administrator.
    | 'OPERATION_NOT_ALLOWED'  // Password sign-in is disabled for this project.
    | 'TOO_MANY_ATTEMPTS_TRY_LATER'  // We have blocked all requests from this device due to unusual activity. Try again later.

    // Cant confirm after manual checking
    | 'EMAIL_NOT_FOUND'  // There is no user record corresponding to this identifier. The user may have been deleted.
    | 'INVALID_PASSWORD'  // The password is invalid or the user does not have a password.
    , string>

  export type ErrorResponse = {
    error: {
      code: number,
      message: ErrorMessage,
      status?: string
    }
  }
}

export namespace RefreshTokenTypes {
  export type RequestBody = {
    grant_type: 'refresh_token'
    refresh_token: string
  }
  
  export type Response = {
    expires_in: string  // The number of seconds in which the ID token expires.
    token_type: string  // The type of the refresh token, always "Bearer".
    refresh_token: string  // The Firebase Auth refresh token provided in the request or a new refresh token.
    id_token: string  // A Firebase Auth ID token.
    user_id: string  // The uid corresponding to the provided ID token.
    project_id: string  // Your Firebase project ID.
  }
  
  export type ErrorMessage = LiteralUnion<
    'TOKEN_EXPIRED'  // The user's credential is no longer valid. The user must sign in again.
    | 'USER_DISABLED'  // The user account has been disabled by an administrator.
    | 'USER_NOT_FOUND'  // The user corresponding to the refresh token was not found. It is likely the user was deleted.
    // API key not valid. Please pass a valid API key. (invalid API key provided)
    | 'INVALID_REFRESH_TOKEN'  // An invalid refresh token is provided.
    // Invalid JSON payload received. Unknown name \"refresh_tokens\": Cannot bind query parameter. Field 'refresh_tokens' could not be found in request message.
    | 'INVALID_GRANT_TYPE'  // The grant type specified is invalid.
    | 'MISSING_REFRESH_TOKEN'  // No refresh token provided.
    | 'PROJECT_NUMBER_MISMATCH'  // The project number of the refresh token does not match that of the API key provided.
    , string>
  
    export type ErrorResponse = {
      error: {
        code: number,
        message: ErrorMessage,
        status?: string
      }
    }
}


// export type OobCodeRequestHeaders = {
//   'X-Firebase-Locale'?: string
// }

// export type OobCodeRequestBody = {
//   requestType: 'PASSWORD_RESET',
//   email: string
// } | {
//   requestType: 'VERIFY_EMAIL',
//   idToken: string
// }

// export type OobCodeResponse = {
//   email: string
// }

// export type OobCodeErrorMessages<RequestType extends OobCodeRequestBody['requestType']> =
//   RequestType extends 'PASSWORD_RESET'
//   ? 'EMAIL_NOT_FOUND'  // There is no user record corresponding to this identifier. The user may have been deleted.
//   : 'INVALID_ID_TOKEN'  // The user's credential is no longer valid. The user must sign in again.


export type UserData = {
  id: string,
  name: string,
  email: string,

  auth: {
    authToken: string
    expiresOn: number
    refreshToken: string
  } | null
}
