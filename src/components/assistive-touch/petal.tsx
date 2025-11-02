import React from "react";
import { Tooltip } from "antd";

// 小球数量
const PetalNum: number = 4;

interface PetalProps {
    index: number; // 小球位置
    tipText: string; // 小球提示
    onClick: () => void; // 小球点击事件
    children?: React.ReactNode; // 小球子元素
}

// 小球样式 花瓣
export const Petal = React.memo((props: PetalProps) => {
    return <Tooltip placement="top" title={props.tipText}>
        <div onClick={props.onClick} className="child-ball" style={petalStyle(props.index)}>
            {props.children}
        </div>
    </Tooltip>
});

// position 最大支持到 5 最小支持 0.也就是一圈只能有 6 个位置
const petalStyle = (position: number): React.CSSProperties => {
    position = position > PetalNum || position < 0 ? 0 : position;
    return {
        top: `${(PetalNum * 10 / 2 + 20) * Math.sin((position / PetalNum) * Math.PI * 2)}px`,
        left: `${(PetalNum * 10 / 2 + 20) * Math.cos((position / PetalNum) * Math.PI * 2)}px`,
    };
}