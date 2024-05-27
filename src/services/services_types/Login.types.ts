export type LoginCredentials = {
    email: string;
    pass: string;
}

export type LoginCredentialsRequest = {
    request: LoginCredentials;
}

export type LoginCredentialsType = (params: LoginCredentialsRequest) => Promise<number>;