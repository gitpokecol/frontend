import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../component/PageContainer";
import { Typography } from "@mui/material";
import { getGithubAuthCallback } from "../api/apis";
import { ACCESS_TOKEN_KEY } from "../constant/common";
import axiosInstance from "../api/axiosInstance";

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      throw new Error("Login was failed.");
    }

    if (code) {
      getGithubAuthCallback(code)
        .then((response) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
          axiosInstance.defaults.headers.Authorization = response.access_token;
        })
        .catch((error) => {})
        .finally(() => {
          navigate("/");
        });
    }
  }, [searchParams]);

  return (
    <PageContainer backgroundTheme="small">
      <Typography>Loading...</Typography>
    </PageContainer>
  );
}
