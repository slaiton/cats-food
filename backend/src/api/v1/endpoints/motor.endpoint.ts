import { Request, Response } from "express";
import { executeMotor } from "../../../modules/motor/motor.service";
import { MotorStatus } from "../../../modules/motor/motor.types";

interface MotorParams {
  deviceId: string;
}

export async function controlMotor(
  req: Request<MotorParams>,
  res: Response
) {
  try {

    
    const { deviceId } = req.params;
    const { action, speed } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        error: "deviceId is required"
      });
    }

    const result = await executeMotor(
      deviceId,
      action as MotorStatus,
      speed
    );

    return res.status(200).json(result);

  } catch (err: any) {
    return res.status(500).json({
      error: err.message
    });
  }
}