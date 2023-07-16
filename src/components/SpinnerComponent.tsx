import styles from "./Spinner.module.css";
import classNames from "classnames";

function Spinner() {
  return (
    <div className={classNames("spinner-border", styles.spinner)} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
