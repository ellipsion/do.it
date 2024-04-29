import { Loader2 } from "lucide-react";
import { FC } from "react";

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = ({}) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-white animate-fade">
      <Loader2 className="animate-spin stroke-gray-400" size={80} />
    </div>
  );
};

export default Spinner;
