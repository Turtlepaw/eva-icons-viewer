import { CSSProperties } from "react";
import { WebsiteConfiguration } from "../pages/_app";

export const Configuration: WebsiteConfiguration & { Icon: { ColoredSVG: string } } = {
    TagLine: "Eva Icons Unofficial Viewer",
    WebsiteURL: "https://bop.trtle.xyz/",
    Title: "Eva Icons",
    Icon: {
        SVG: "/Robot.svg",
        PNG: "/Robot.png",
        ColoredSVG: "/RobotColored.svg"
    },
    Description: "Eva Icons is a pack of more than 480 beautifully crafted Open Source icons for common actions and items. Download our set on the desktop to use them in your digital products for Web, iOS and Android. Compatible with Eva Design System.",
    Color: "#36f"
}

export const BrandColor: CSSProperties = {
    color: Configuration.Color
}

export const BrandBg: CSSProperties = {
    backgroundColor: Configuration.Color
}

export const BrandBorder: CSSProperties = {
    borderColor: Configuration.Color
}
