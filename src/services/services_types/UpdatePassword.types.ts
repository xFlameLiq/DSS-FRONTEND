export type UpdatePassword = {
    email: string;
    newPass: string;
}

export type UpdatePasswordRequest = {
    request: UpdatePassword;
}

export type UpdatePasswordType = (params: UpdatePasswordRequest) => Promise<number>;