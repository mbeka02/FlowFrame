import { createHmac } from "crypto";
const API_SECRET_KEY = process.env.SECRET_KEY!;

export function verify(eventData: any, signature: string): boolean {
  const hash = createHmac("sha512", API_SECRET_KEY)
    .update(JSON.stringify(eventData))
    .digest("hex");
  return hash === signature;
}
