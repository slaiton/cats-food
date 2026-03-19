import { MotorStatus } from "./motor.types";
import { mqttService } from "../../core/mqtt";

function toggle(action: MotorStatus): MotorStatus {
  switch (action) {
    case "FORWARD":
      return "STOPPED";
    case "STOPPED":
      return "FORWARD";
    default:
      return "STOPPED";
  }
}

export async function executeMotor(
  deviceId: string,
  action: MotorStatus,
  speed: number = 0
) {

  const newStatus = toggle(action);

  const payload = {
    action: newStatus,
    speed
  };

  const topic = `device/${deviceId}/motor/control`;

  mqttService.publish(topic, payload);

  return {
    deviceId,
    topic,
    ...payload
  };
}