export type  CreateNewUser= {
    name: string;
    paternal_surname: string;
    maternal_surname?: string;
    email: string;
    cp: number;
    birthdate: Date;
    pass: string;
    emailRecovery: string;
}

export type CreateNewUserRequest = {
    request: CreateNewUser;
}

export type CreateNewUserType = (params: CreateNewUserRequest) => Promise<number>;