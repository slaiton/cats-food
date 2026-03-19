import express from "express";
import { controlMotor } from "../api/v1/endpoints/motor.endpoint";

const router = express.Router();

router.post("/motor/:deviceId/control", controlMotor);

export default router;