import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    safelist: [
        "bg-std-red-light",
        "bg-std-orange-light",
        "bg-std-yellow-light",
        "bg-std-green-light",
        "bg-std-blue-light",
        "bg-std-indigo-light",
        "bg-std-violet-light",
        "text-std-red-dark",
        "text-std-orange-dark",
        "text-std-yellow-dark",
        "text-std-green-dark",
        "text-std-blue-dark",
        "text-std-indigo-dark",
        "text-std-violet-dark"
    ],
    theme: {
        extend: {
            colors: {
                "std-red": {
                    default: "#E63946",
                    dark: "#8B1319",
                    light: "#FFE5E5"
                },
                "std-orange": {
                    default: "#F4845F",
                    dark: "#A03912",
                    light: "#FFEDE5"
                },
                "std-yellow": {
                    default: "#FFD166",
                    dark: "#998500",
                    light: "#FFFDE5"
                },
                "std-green": {
                    default: "#06D6A0",
                    dark: "#056B4A",
                    light: "#E5FBF5"
                },
                "std-blue": {
                    default: "#118AB2",
                    dark: "#052A36",
                    light: "#E5F4FB"
                },
                "std-indigo": {
                    default: "#5C6BC0",
                    dark: "#252E7A",
                    light: "#E8EAFC"
                },
                "std-violet": {
                    default: "#9B5DE5",
                    dark: "#4A1C85",
                    light: "#F2E5FF"
                },
                "gray": {
                    "light": "#F8F8F8",
                    "light-accent": "#E8E8E8",
                    "light-muted": "#B0B0B0",
                    "dark-muted": "#444444",
                    "dark-accent": "#333333",
                    "dark": "#242424"
                }
            }
        }
    }
};

export default config;
