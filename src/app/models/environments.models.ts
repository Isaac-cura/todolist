export interface Environment{
    production: boolean;
    timeToAskSession: number;
    timeToExpireSession: number;
    apiBase: string,
    userEndpoint: string
}