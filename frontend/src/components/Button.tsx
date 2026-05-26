import styles from "../styles/Button.module.css";
interface ButtonProps {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function Button({ text, onClick }: ButtonProps) {

    return (
        <>
            <div className={styles["button-block"]}>
                <button className={styles["button"]}
                    onClick={onClick}>{text}</button>
                <div className={styles["button-blur-1"]}></div>
                <div className={styles["button-blur-2"]}></div>
            </div>
        </>
    );
}