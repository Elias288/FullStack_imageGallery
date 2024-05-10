import { ClipLoader } from "react-spinners";
import "./Loader.css";

interface LoaderComponentProps {
  isCentered?: boolean;
}
function LoaderComponent({ isCentered = true }: LoaderComponentProps) {
  return (
    <div className={isCentered ? "centeredBox" : ""}>
      <ClipLoader />
    </div>
  );
}

export default LoaderComponent;
