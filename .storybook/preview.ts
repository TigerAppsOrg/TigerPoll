import type { Preview } from "@storybook/sveltekit";
import "../src/app.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },

        a11y: {
            test: "todo"
        },

        backgrounds: {
            options: {
                "light": { name: "Light", value: "#F8F8F8" },
                "white": { name: "White", value: "#FFFFFF" },
                "dark": { name: "Dark", value: "#242424" },
                "ocean-mist": {
                    name: "Ocean Mist",
                    value: "linear-gradient(135deg, #E5F4FB 0%, #E8EAFC 100%)"
                },
                "forest-dawn": {
                    name: "Forest Dawn",
                    value: "linear-gradient(135deg, #E5FBF5 0%, #FFFDE5 100%)"
                },
                "sunset-glow": {
                    name: "Sunset Glow",
                    value: "linear-gradient(135deg, #FFEDE5 0%, #FFE5E5 100%)"
                },
                "lavender-dream": {
                    name: "Lavender Dream",
                    value: "linear-gradient(135deg, #F2E5FF 0%, #E8EAFC 100%)"
                }
            }
        }
    },
    initialGlobals: {
        backgrounds: { value: "light" }
    },
    tags: ["autodocs"]
};

export default preview;
