import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                red: {
                    default: "#E63946",
                    dark: "#A31621",
                    light: "#FFCCCB"
                },
                orange: {
                    default: "#F4845F",
                    dark: "#CB5C1C",
                    light: "#FFDAB9"
                },
                yellow: {
                    default: "#FFD166",
                    dark: "#E6B800",
                    light: "#FFFACD"
                },
                green: {
                    default: "#06D6A0",
                    dark: "#078C5F",
                    light: "#D0F0C0"
                },
                blue: {
                    default: "#118AB2",
                    dark: "#073B4C",
                    light: "#B6DEF7"
                },
                indigo: {
                    default: "#5C6BC0",
                    dark: "#303F9F",
                    light: "#C5CAE9"
                },
                violet: {
                    default: "#9B5DE5",
                    dark: "#6A2CB0",
                    light: "#E0CFFC"
                },
                gray: {
                    "light": "#F0F0F0",
                    "light-accent": "#E0E0E0",
                    "light-muted": "#D0D0D0",
                    "dark": "#242424",
                    "dark-accent": "#333333",
                    "dark-muted": "#444444"
                }
            }
        }
    }
};

export default config;
