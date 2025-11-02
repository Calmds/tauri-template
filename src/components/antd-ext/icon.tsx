import React from "react";
import { Space } from "antd";
import Icon from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

// 自定义图片
export const ImgIcon = React.memo((props: { iconSrc: string } & Partial<CustomIconComponentProps>) => {
    const ele = <img className="logoImg" src={props.iconSrc} alt='' />
    return <Icon component={() => ele} {...props} />
});

// 使用 antd 的图标
export const DynamicIcon = React.memo((props: { iconName: string }) => {
    const antIcon: { [key: string]: any } = Icons
    return React.createElement(antIcon[props.iconName])
})

// 图标+文字
export const IconText = React.memo(({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
));