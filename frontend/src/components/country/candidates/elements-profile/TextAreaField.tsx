import styles from "../../../../styles/country/candidates/elements-profile/TextAreaField.module.css";
interface TextAreaFieldProps {
    name: string;
    id: string;
    value: string;
    classes: string[];
    placeholder: string;
    onChange: (value: string) => void;

}
export default function TextAreaField({ name, id, value, classes, placeholder, onChange }: TextAreaFieldProps) {
    return (
        <>
            <div className={styles["candidate-texarea-container"]}>
                <textarea
                    name={name} id={id} value={value}
                    className={classes.map(c => styles[c]).join(" ")}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)
                    }>
                </textarea>
            </div>
        </>
    );
}