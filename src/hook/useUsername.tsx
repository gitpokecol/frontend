import { ACCESS_TOKEN_KEY } from "../constant/common";
import base64 from "base-64";
import { JwtPayload } from "../type/user";

export default function useUsername(): string | null {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;

  try {
    const payload = JSON.parse(base64.decode(token.split(".")[1])) as JwtPayload;
    return payload.username;
  } catch {
    return null;
  }
}
