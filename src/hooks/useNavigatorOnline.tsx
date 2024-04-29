import * as React from "react";

const getOnLineStatus = () => {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : false;
};

const useNavigatorOnLine = () => {
  const [isOnline, setIsOnline] = React.useState(getOnLineStatus());

  React.useEffect(() => {
    const handleOnlineEvent = () => {
      setIsOnline(true);
    };

    const handleOfflineEvent = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnlineEvent);
    window.addEventListener("offline", handleOfflineEvent);

    return () => {
      window.removeEventListener("online", handleOnlineEvent);
      window.removeEventListener("offline", handleOfflineEvent);
    };
  }, []);

  return isOnline;
};

export default useNavigatorOnLine;
