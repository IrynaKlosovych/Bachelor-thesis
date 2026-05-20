import { useState } from "react";

type Props = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
};

export default function NumericInput({
    value,
    onChange,
    min = 0,
}: Props) {
    const [localValue, setLocalValue] = useState(
        value.toString()
    );

    const sanitize = (val: string) => {
        return val.replace(/\D/g, "");
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            value={localValue}
            onChange={(e) => {
                let val = sanitize(e.target.value);

                val = val.replace(/^0+(?=\d)/, "");

                setLocalValue(val);

                if (val === "") {
                    onChange(0);
                    return;
                }

                const num = Number(val);

                if (num >= min) {
                    onChange(num);
                }
            }}
            onBlur={() => {
                if (localValue === "") {
                    setLocalValue("0");
                    onChange(0);
                }
            }}
        />
    );
}