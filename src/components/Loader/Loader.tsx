import css from "./Loader.module.css";
import { RingLoader } from "react-spinners";

export default function Loader() {
  return <div className={css.backdrop}>{<RingLoader color="black" />}</div>;
}
