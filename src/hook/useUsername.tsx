import { ACCESS_TOKEN_KEY } from "../constant/common";
import base64 from "base-64";
import { JwtPayload } from "../type/user";

export default function useUsername() {
  const jwt = localStorage.getItem(ACCESS_TOKEN_KEY).substring(7) as string;
  const payload = JSON.parse(base64.decode(jwt.split(".")[1])) as JwtPayload;

  return payload.username;
}
