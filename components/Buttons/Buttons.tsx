import styles from "./Buttons.module.css";

interface IButton {
  children: React.ReactNode;
  onClick?: any;
  type?: "submit";
  disabled?: boolean;
}

export function Btn({ children, type, disabled, onClick }: IButton) {
  return (
    <button
      type={type || "button"}
      className={styles.common}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BoldBtn({ children, type, onClick }: IButton) {
  return (
    <button type={type || "button"} className={styles.bold} onClick={onClick}>
      {children}
    </button>
  );
}

export function WarningBtn({ children, type, onClick }: IButton) {
  return (
    <button
      type={type || "button"}
      className={styles.warning}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function OutlineWarningBtn({ children, type, onClick }: IButton) {
  return (
    <button
      type={type || "button"}
      className={styles.outlineWarning}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
