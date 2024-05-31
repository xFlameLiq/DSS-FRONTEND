export type EmailCredentials = {
    emailRecovery: string;
}

export type EmailCredentialsRequest = {
    request: EmailCredentials;
}

export type PasswordRecoveryResponse = {
    data: {
        data: {
            email: string;
        }
        status: number
    }
}

export type PasswordRecoveryType = (params: EmailCredentialsRequest) => Promise<PasswordRecoveryResponse>;