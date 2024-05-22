export type  CreateNewUser= {
    name: string;
    email: string;
    pass: string;
}

export type CreateNewUserRequest = {
    request: CreateNewUser;
}

export type CreateNewUserType = (params: CreateNewUserRequest) => Promise<number>;