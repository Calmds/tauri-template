import { notification } from 'antd';
import React from 'react';

interface Props {
    text: string;
    style?: React.CSSProperties
}

const handlePinMessage = (message: string) => {
    notification.destroy();
    notification.open({
        style: {
            overflowX: "scroll",
            background: "rgba(128, 128, 128, 0)",
            backgroundColor: "rgba(128, 128, 128, 0)",
        },
        duration: 180,
        placement: "topRight",
        message: (<>
            <strong>📌 固定消息</strong><br />
            <small style={{ color: "gray" }}>固定时间为 3 分钟</small>
            <br />
            <small style={{ color: "green" }}>👂🏻 内容可以滚动的，只是滚动条不显示</small>
        </>),
        description: (<pre dangerouslySetInnerHTML={{ __html: message }}
            style={{ overflowX: "scroll", color: "red", fontWeight: "bold" }}></pre>),
    });
}

const FormatText: React.FC<Props> = React.memo(({ text, style }) => {
    const formattedText = text
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\r\n|\r/g, '<br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')

    return (<div style={{
        padding: "5px",
        overflow: "scroll",
        position: 'relative',
        borderRadius: "15px",
        whiteSpace: "pre-line",
        background: "rgba(128, 128, 128, 0.3)",
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        ...style,
    }}>
        <div onClick={() => handlePinMessage(formattedText)} style={{
            top: '0',
            right: '0',
            color: 'white',
            margin: '10px',
            padding: '5px',
            cursor: "pointer",
            position: 'absolute',
            borderRadius: '15px',
            border: '1px solid gray',
            background: "rgba(128, 128, 128, 0.3)",
            backgroundColor: "rgba(128, 128, 128, 0.3)",
        }}>
            固定此消息
        </div>
        <div style={{ overflow: "scroll", marginTop: '30px', height: "100%" }}>
            <pre dangerouslySetInnerHTML={{ __html: formattedText }} ></pre>
        </div>
    </div>);
});

export default FormatText;
