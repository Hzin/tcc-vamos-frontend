import { Vehicle } from "./vehicle.model";

export interface User {
    id_user: string;
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
    birth_date: string;
    avatar_image: string;
    bio: string;
    star_rating: number;
    document_type: string;
    document: string;
    vehicle: Vehicle[];
    // created_at: Date;
    // updated_at: Date;
}