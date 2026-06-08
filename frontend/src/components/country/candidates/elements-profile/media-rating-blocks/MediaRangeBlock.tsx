import styles from "../../../../../styles/country/candidates/elements-profile/media-rating-blocks/InputCandidatesRanges.module.css";
interface MediaRangeBlockProps {
    name: string;
    id: string;

    value: number;
    min: number;
    max: number;
    onChange: (value: string) => void;
}
export default function MediaRangeBlock({ name, id, value, min, max, onChange }: MediaRangeBlockProps) {
    return (
        <>
            <div className={styles["candidate-input-range"]}>
                <input
                    name={name}
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(e.target.value)
                    }></input>
            </div>
        </>
    );
}