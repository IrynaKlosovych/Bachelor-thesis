import styles from "../../../../styles/country/candidates/elements-profile/CandidateNameInput.module.css";

interface CandidateNameInputProps {
    value: string;
    name: string;
    classes: string[];
    placeholder: string;
    id: string;
    onChange: (value: string) => void;
}
export default function CandidateNameInput({ value, name, id, placeholder, classes, onChange }: CandidateNameInputProps) {
    return (
        <>
            <div className={styles["candidate-name-container"]}>
                <input
                    name={name}
                    id={id}
                    className={classes.map(c => styles[c]).join(" ")}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)
                    }
                />
            </div>
        </>
    );
}