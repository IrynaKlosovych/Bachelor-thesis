export function generateUniqueColor(usedHues: number[]) {
    let hue = Math.floor(Math.random() * 360);

    while (usedHues.includes(hue)) {
        hue = (hue + 25) % 360;
    }

    return {
        hue,
        color: `hsl(${hue}, 70%, 55%)`,
    };
}