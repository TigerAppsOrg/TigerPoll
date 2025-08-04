import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    safelist: [
        // Dynamic color classes used in QuestionResults
        'bg-red-light', 'bg-orange-light', 'bg-yellow-light', 'bg-green-light', 
        'bg-blue-light', 'bg-indigo-light', 'bg-violet-light',
        'text-red-dark', 'text-orange-dark', 'text-yellow-dark', 'text-green-dark',
        'text-blue-dark', 'text-indigo-dark', 'text-violet-dark'
    ],
    theme: {
        extend: {
            colors: {
                red: {
                    default: "#E63946",
                    dark: "#8B1319",
                    light: "#FFE5E5"
                },
                orange: {
                    default: "#F4845F",
                    dark: "#A03912",
                    light: "#FFEDE5"
                },
                yellow: {
                    default: "#FFD166",
                    dark: "#B8A000",
                    light: "#FFFDE5"
                },
                green: {
                    default: "#06D6A0",
                    dark: "#056B4A",
                    light: "#E5FBF5"
                },
                blue: {
                    default: "#118AB2",
                    dark: "#052A36",
                    light: "#E5F4FB"
                },
                indigo: {
                    default: "#5C6BC0",
                    dark: "#252E7A",
                    light: "#E8EAFC"
                },
                violet: {
                    default: "#9B5DE5",
                    dark: "#4A1C85",
                    light: "#F2E5FF"
                },
                gray: {
                    "light": "#F8F8F8",
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
