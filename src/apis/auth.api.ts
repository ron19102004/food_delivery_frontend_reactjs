/* eslint-disable @typescript-eslint/no-explicit-any */
import api, {Entity, IResponseLayout} from "./api.config";
import axios from "axios";

//entity type
export enum UserRole {
    USER = "USER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
    DELIVER = "DELIVER",
}

export interface UserEntity extends Entity {
    updatedAt: string;
    createdAt: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    avatar: string;
    role: UserRole;
    enabled_two_factor_auth: boolean;
    is_locked: boolean;
}

//#############################################
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: UserEntity;
    two_factor_auth: boolean;
    access_token: string;
}

export async function login(
    req: LoginRequest,
    handler: (res: IResponseLayout<LoginResponse>) => void,
    errorHandler: (err: any) => void
): Promise<void> {
    await axios
        .post<IResponseLayout<LoginResponse>>(api("auth/login"), req, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            handler(res.data);
        })
        .catch((err) => {
            errorHandler(err);
        });
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    password: string;
}

export async function register(
    req: RegisterRequest,
    handler: (res: IResponseLayout<UserEntity>) => void,
    errorHandler: (err: any) => void
): Promise<void> {
    await axios
        .post<IResponseLayout<UserEntity>>(api("auth/register"), req)
        .then((res) => {
            handler(res.data);
        })
        .catch((err) => {
            errorHandler(err);
        });
}

export interface VerifyRequest {
    code: string;
    token: string;
}

export interface VerifyResponse extends LoginResponse {
}

export async function verifyOtp(
    req: VerifyRequest,
    handler: (res: IResponseLayout<VerifyResponse>) => void,
    errorHandler: (err: any) => void
): Promise<void> {
    await axios
        .post<IResponseLayout<VerifyResponse>>(api("auth/verify-otp"), req)
        .then((res) => {
            handler(res.data);
        })
        .catch((err) => {
            errorHandler(err);
        });
}

export async function changeTFA(
    token: string,
    handler: (res: IResponseLayout<string>) => void,
    errorHandler: (err: any) => void
): Promise<void> {
    await axios
        .post<IResponseLayout<string>>(api("auth/change-tfa"), null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            handler(res.data);
        })
        .catch((err) => {
            errorHandler(err);
        });
}

export async function getMyInfo(
    token: string,
    handler: (res: IResponseLayout<UserEntity>) => void,
    errorHandler: (err: any) => void
): Promise<void> {
    await axios
        .get<IResponseLayout<UserEntity>>(api("auth/me"), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            handler(res.data);
        })
        .catch((err) => {
            errorHandler(err);
        });
}
