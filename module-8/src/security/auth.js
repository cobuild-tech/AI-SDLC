import { timingSafeEqual } from "node:crypto";

export function isAuthorized(request, expectedApiKey) {
  if (!expectedApiKey) return false;
  const supplied = request.headers["x-api-key"];
  if (typeof supplied !== "string") return false;

  const expectedBuffer = Buffer.from(expectedApiKey);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, suppliedBuffer);
}
