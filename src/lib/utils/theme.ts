export type Color =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "violet";

export type ColorTags = {
    default: string;
    light: string;
    dark: string;
};

const colors: Color[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
];
export const colorMap: Record<Color, ColorTags> = Object.fromEntries(
    colors.map((color) => [
        color,
        {
            light: `bg-${color}-light`,
            dark: `text-${color}-dark`,
            default: `bg-${color}-default`
        }
    ])
) as Record<Color, ColorTags>;
