import styles from "../../../styles/country/candidates/EmptyCandidates.module.css";
interface EmptyCandidatesProps {
    text: string;
}
export default function EmptyCandidates({ text }: EmptyCandidatesProps) {
    return (
        <div className={styles["no-candidate-block"]}>{text}</div>
    );
}