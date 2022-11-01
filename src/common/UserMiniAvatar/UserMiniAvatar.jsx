import { HiUserCircle } from "react-icons/hi";
import { useState, useEffect } from "react";

export function UserMiniAvatar({ name, avatar, isSmall, emptySize = "2rem" }) {
  useEffect(() => {
    setValid(true);
  }, [avatar])
  const [isValid, setValid] = useState(true);
  return avatar && isValid ? (
    <img
      src={avatar}
      alt={name || "user avatar"}
      style={{
        width: isSmall ? "30px" : "inherit",
        height: isSmall ? "30px" : "inherit",
        objectFit: "cover",
        borderRadius: "100%",
        overflow: "hidden",
        maxWidth: "350px",
        maxHeight: "350px",
      }}
      onError={() => setValid(false)}
    />
  ) : (
    <HiUserCircle size={emptySize} />
  );
}
