import { PhysicalSize } from "@tauri-apps/api/window";

export interface IProps {
    position?: Position;
    onClick?: () => void;
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNode[] | string;
}

export enum Position {
    Top = "Top",
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    Center = "Center",
    Bottom = "Bottom",
    Right = "Right",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight",
}

export const getPosition = (position: Position) => {
    // const size = await appWindow.innerSize();
    const size = new PhysicalSize(window.screen.availWidth, window.screen.availHeight)
    switch (position) {
        case Position.Top: return { x: size.width / 2, y: 35 };
        case Position.TopLeft: return { x: 35, y: 35 };
        case Position.TopRight: return { x: size.width - 130, y: 35 };
        case Position.Center: return { x: (size.width / 2), y: size.height / 2 };
        case Position.Bottom: return { x: (size.width / 2), y: size.height - 130 };
        case Position.BottomLeft: return { x: 60, y: (size.height - 130) };
        case Position.BottomRight: return { x: (size.width - 130), y: size.height - 130 };
        // 默认居中
        default: return { x: (size.width / 2), y: (size.height / 4) };
    }
};