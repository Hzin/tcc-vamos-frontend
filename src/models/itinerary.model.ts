export interface Itinerary {
    id_itinerary: number;
    van_plate: string;
    price: number;
    days_of_week: number;
    specific_day: Date;
    estimated_departure_time: Date;
    estimated_arrival_time: Date;
    available_seats: number;
    itinerary_nickname: string;
    created_at: Date;
    updated_at: Date;
}