import { useEffect, useState } from "react";
import { getGithubAuthUrl } from "../../api/apis";

export default function useGithubLoginUrl() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);

  useEffect(() => {
    getGithubAuthUrl().then((loginUrl_) => setLoginUrl(loginUrl_));
  }, []);

  return { loginUrl };
}
