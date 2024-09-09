import PageContainer from "../component/PageContainer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "../constant/common";

export default function RootPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      navigate("/daily-item");
    } else {
      navigate("/login");
    }
  }, []);

  return <PageContainer></PageContainer>;
}
