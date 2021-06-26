export interface IAuthenticateRequest {
  email: string;
  password: string;
}

export default interface IAuthenticationService {
  authenticateUser(data: IAuthenticateRequest): Promise<string>;
}
