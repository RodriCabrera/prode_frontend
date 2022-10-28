import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifiedEmail() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/auth");
    }, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      Your email was verified correctly! Redirecting you to the login page...
    </div>
  );
}

export default VerifiedEmail;
