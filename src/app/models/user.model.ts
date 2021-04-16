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