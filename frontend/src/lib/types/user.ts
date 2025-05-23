export type User = {
    data: UserData;
    message: string;
    success: boolean;
};

type UserData = {
    id: string;
    fullName: string;
    phoneNumber: number;
    deliveryAddress: string;
};


 export interface UserContextProps {
    user: User | null;
  }