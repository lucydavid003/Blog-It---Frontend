import { useNavigate } from "react-router-dom";
import useUser from "../Store.ts/userStore";
import { useEffect } from "react";

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{children}</>;
}

export default Protected;
