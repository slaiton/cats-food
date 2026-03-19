export type MotorStatus =
  | "FORWARD"
  | "BACKWARD"
  | "STOPPED";

export interface Motor {
  id?: number;
  device_id: string;
  status: MotorStatus;
  speed: number;
  updated_at?: Date;
}