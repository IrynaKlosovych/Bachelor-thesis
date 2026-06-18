import styles from "../../../../../styles/country/candidates/elements-profile/media-rating-blocks/CandidateMediaBlock.module.css";
interface MediaInputBlockProps {
    classes: string[];
    name: string;
    id: string;
    min: number;
    max: number;
    value: number;
}
export default function MediaInputBlock({ classes, name, id, min, max, value }: MediaInputBlockProps) {
    return (
        <>
            <div className={classes.map(c => styles[c]).join(" ")}>
                <input
                    name={name}
                    id={id}
                    type="text"
                    min={min}
                    max={max}
                    value={value}
                    disabled
                    readOnly
                />
            </div>
        </>
    );
}