import useNavigatorOnLine from "./useNavigatorOnline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useCheckConnection = () => {
  const [connectionLost, setConnectionLost] = useState(false);
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    if (!isOnline) {
      toast.loading("connection lost", { position: "bottom-right" });
      setConnectionLost(true);
    } else if (connectionLost) {
      toast.remove();
      toast.success("connection restored", { position: "bottom-right" });
    }
  }, [isOnline, connectionLost]);
};

export default useCheckConnection;
