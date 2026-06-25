import styles from "../styles/Button.module.css";
interface ButtonProps {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}
export default function Button({ text, onClick, disabled }: ButtonProps) {

    return (
        <>
            <div className={styles["button-block"]}>
                <button className={styles["button"]}
                    onClick={onClick} disabled={disabled}>{text}</button>
                <div className={styles["button-blur-1"]}></div>
                <div className={styles["button-blur-2"]}></div>
            </div>
        </>
    );
}