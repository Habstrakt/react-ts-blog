import styles from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={`${styles.spinner} spinner-border`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
