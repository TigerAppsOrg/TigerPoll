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
            light: `bg-std-${color}-light`,
            dark: `text-std-${color}-dark`,
            default: `bg-std-${color}-default`
        }
    ])
) as Record<Color, ColorTags>;
