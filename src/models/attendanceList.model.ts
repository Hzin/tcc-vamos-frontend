export interface AttendanceList {
  id_list: number;
  is_return: boolean;
  date: Date;
  status: "CONFIRMED" | "CANCELED";
  created_at: Date;
  updated_at: Date;
}