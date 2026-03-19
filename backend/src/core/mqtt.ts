import mqtt, { MqttClient } from "mqtt";

const mqttUrl = process.env.MQTT_URL as string;

class MQTTService {
  private client: MqttClient;

  constructor() {
    this.client = mqtt.connect(mqttUrl, {
      reconnectPeriod: 5000
    });

    this.initialize();
  }

  private initialize() {
    this.client.on("connect", () => {
      console.log("✅ MQTT Connected");
      this.subscribeTopics();
    });

    this.client.on("error", (err) => {
      console.error("MQTT Error:", err.message);
    });
  }

  private subscribeTopics() {
    this.client.subscribe("device/+/motor/status", (err) => {
      if (!err) {
        console.log("📡 Subscribed to motor status");
      }
    });

    this.client.on("message", this.handleMessage.bind(this));
  }

  private async handleMessage(
    topic: string,
    message: Buffer
  ) {
    try {
      const payload = JSON.parse(message.toString());

      if (topic.includes("/motor/status")) {
        const deviceId = topic.split("/")[1];

        console.log("Status recibido:", deviceId, payload);

        // Aquí llamas tu motor.service
        // await handleMotorStatus(deviceId, payload);
      }

    } catch (error) {
      console.error("MQTT Parse Error:", error);
    }
  }

  public publish(topic: string, message: unknown) {

    if (!this.client.connected) {
      console.error("❌ MQTT not connected");
      return;
    }

    this.client.publish(
      topic,
      JSON.stringify(message),
      { qos: 1 },
      (err) => {
        if (err) {
          console.error("❌ MQTT Publish Error:", err);
        } else {
          console.log("✅ MQTT Message sent:", topic);
        }
      }
    );
  }
}

export const mqttService = new MQTTService();