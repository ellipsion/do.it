import useNavigatorOnLine from "./useNavigatorOnline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useCheckConnection = () => {
  const [connectionLost, setConnectionLost] = useState(false);
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    if (!isOnline) {
      toast.loading("connection lost");
      setConnectionLost(true);
    } else if (connectionLost) {
      toast.remove();
      toast.success("connection restored");
    }
  }, [isOnline, connectionLost]);
};

export default useCheckConnection;
