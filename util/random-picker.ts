export function pickRandomColor() {
    const texts = [
        "#f472b6",
        "#60a5fa",
        "#34d399",
        "#fbbf24",
        "#a78bfa",
        "#fb7185",
        "#38bdf8",
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}