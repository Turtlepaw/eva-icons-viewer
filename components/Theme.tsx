import { InputProps, extendTheme } from "@chakra-ui/react";
import { Configuration } from "../utils/configuration";

const colours = {
    'blurple': '#5865F2',
    'blurple.500': '#5865F2',
    'green': '#3BA55C',
    'red': '#ED4245',
    'grey.extralight': '#ebedef',
    'grey.light': '#4F545C',
    'grey.dark': '#292b2f',
    'grey.extradark': '#1f2022',
    'bg': '#202020',
};

const { blurple, } = colours;

export enum ButtonStyle {
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Danger = "danger",
    BrandColor = "brand",
    Outline = "outline",
    OutlineDark = "outline_dark"
}

export const theme = extendTheme({
    colors: colours,
    styles: {
        global: function (g: any): Record<string, InputProps> {
            return {
                hr: {
                    borderColor: "#33353b"
                },
                button: {
                    _hover: {
                        opacity: "85%"
                    }
                },
                body: {
                    bg: "#18191c"
                },
                input: {
                    //bg: mode('grey.extradark', 'grey.extralight')(props),
                    bg: '#202025',
                    height: '36px',
                    width: '100%',
                    padding: '0px 9px',
                    border: `1px solid #36363b`,
                    transition: '0.2s',
                    outline: 'none',
                    borderRadius: 3,
                    _focus: { border: `1px solid #f6f6fb`, /*_placeholder: { color: "#f6f6fb" }*/ }
                },
            }
        }
    },
    components: {
        Input: {
            defaultProps: { variant: 'normal' }
        },
        Button: {
            baseStyle: {
                color: 'white',
            },
            variants: {
                [ButtonStyle.Primary]: {
                    bg: blurple
                },
                [ButtonStyle.BrandColor]: {
                    bg: Configuration.Color
                },
                [ButtonStyle.Secondary]: {
                    bg: 'grey.light'
                },
                [ButtonStyle.Success]: {
                    bg: 'green'
                },
                [ButtonStyle.Danger]: {
                    bg: 'red'
                },
                [ButtonStyle.Outline]: {
                    _hover: {
                        bg: 'grey.light'
                    }
                },
                MenuItem: {
                    _hover: {
                        bg: "#3c3f45"
                    },
                    bg: "transparent"
                },
                [ButtonStyle.OutlineDark]: {
                    border: "1px solid #222",
                    bgColor: "transparent",
                    _hover: {
                        bg: 'rgb(50, 50, 50)'
                    }
                }
            },
        }
    }
});