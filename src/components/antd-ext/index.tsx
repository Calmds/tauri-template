import React, { JSX } from "react";

/**
 * 解决a标签出现下列问题
 * The href attribute is required for an anchor to be keyboard accessible.
 * Provide a valid, navigable address as the href value. If you cannot provide an href,
 * but still need the element to resemble a link, use a button and change it with appropriate
 */
export const LinkButton = React.memo((props: JSX.IntrinsicAttributes
    & React.ClassAttributes<HTMLButtonElement>
    & React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    let styles: React.CSSProperties = props.style || {} as React.CSSProperties;
    if (!styles.fontSize) {
        styles.fontSize = 14;
    }

    styles.backgroundColor = styles.backgroundColor || "transparent";
    styles.border = styles.border || "none";
    styles.outline = styles.outline || "none";
    styles.color = styles.color || "#587291ff";
    styles.cursor = styles.cursor || "pointer";
    return <button {...props} style={styles}>{props.children}</button>
});

const BorderStyle: React.CSSProperties = {
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    minWidth: '100%',
    minHeight: '100%',
    border: '1px solid',
    position: 'relative',
    filter: 'hue-rotate()',
    clipPath: 'inset(0 round 10px)',
    borderImage: 'linear-gradient(45deg, gold, deeppink) 1',
};

// 圆角框框
export const Border = React.memo((props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.ButtonHTMLAttributes<HTMLDivElement>) => {
    let styles = { ...props.style, ...BorderStyle };
    return <div {...props} style={styles}>{props.children}</div>
});

// <Title title="参数列表" width="90px" />
export const Title: React.FC<{ title: string, width?: string }> = React.memo(({ title, width }) => (
    <div style={{
        width: width && width || ((title.length * 15 + 8) + 'px'),
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
        borderRadius: '15px',
        borderBottom: '5px solid purple',
    }}>
        {title}:
    </div>
));