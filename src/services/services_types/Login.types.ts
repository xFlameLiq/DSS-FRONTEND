export type LoginCredentials = {
    email: string;
    pass: string;
}

export type LoginCredentialsRequest = {
    request: LoginCredentials;
}

export type UserAuthenticated = {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        rol: number;
    }

}

export type LoginCredentialsType = (params: LoginCredentialsRequest) => Promise<UserAuthenticated>;