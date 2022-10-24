import { User } from "./user.model";

export interface Passenger {
    id_passenger: number;
    address: string;
    latitude_address: number;
    longitude_address: number;
    payment_status: boolean;
    start_date: string;
    end_date: string;
    is_single: boolean;
    user: User
}