export interface User {
    username: string;
    email: string;
    password: string;
}

export interface DTOUser{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    status: boolean;
}

export interface UserDatasource{
    id: number;
    name: string;
    "teléfono": string;
    email: string;
    estado: boolean;
}