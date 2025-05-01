export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    deliveryAddress: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        deliveryAddress: string;
    };
}

export interface deliveryPartnerRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface deliveryPartnerResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        fullName: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        fullName: string;
        phoneNumber: string;
        deliveryAddress: string;
    };
}


export interface deliveryPartnerLoginRequest {
    email: string;
    password: string;
}


export interface deliveryPartnerLoginResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        fullName: string;
        phoneNumber: string;
    };
}
export interface AdminLoginRequest {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
    };
}