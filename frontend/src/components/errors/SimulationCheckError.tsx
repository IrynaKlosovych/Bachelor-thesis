import styles from "../../styles/error/Errors.module.css";
interface SimulationCheckErrorProps {
    messages: string[];
}
export default function SimulationCheckError({ messages }: SimulationCheckErrorProps) {
    return (
        <>
            <div>
                <ul className={styles["error-list"]}>
                    {messages.map((message, index) => (
                        <li key={`message_${index}`}>{message}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}