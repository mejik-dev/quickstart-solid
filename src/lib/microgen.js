import { MicrogenClient } from "microgen-v3-sdk";

export const microgen = new MicrogenClient({
  apiKey: import.meta.env.VITE_MICROGEN_API_KEY,
});
