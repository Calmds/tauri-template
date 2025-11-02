import React, { useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import './index.css';

const MacWindowControls: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    // 鼠标移入显示控制栏
    const handleMouseEnter = () => setIsVisible(true);

    // 鼠标移出隐藏控制栏
    const handleMouseLeave = () => setIsVisible(false);

    // 关闭窗口
    const handleClose = async () => await getCurrentWindow().close();

    // 最小化窗口
    const handleMinimize = async () => {
        setIsVisible(false);
        await getCurrentWindow().minimize();
    }

    // 最大化/还原窗口
    const handleMaximize = async () => {
        setIsVisible(false);
        if (isMaximized) {
            await getCurrentWindow().unmaximize();
            setIsMaximized(false);
        } else {
            await getCurrentWindow().maximize();
            setIsMaximized(true);
        }
    };

    // 拖拽窗口
    const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setIsVisible(true);
        getCurrentWindow().startDragging();
    };

    return (
        <div
            className={`mac-controls-bar ${isVisible ? 'visible' : 'hidden'}`}
            onMouseDown={handleDragStart}
            onDoubleClick={handleMaximize}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="control-btn close-btn" onClick={handleClose} title="关闭">
                <div className="btn-inner"></div>
            </button>

            <button className="control-btn minimize-btn" onClick={handleMinimize} title="最小化">
                <div className="btn-inner"></div>
            </button>

            <button className="control-btn maximize-btn" onClick={handleMaximize} title={"最大化"}>
                <div className="btn-inner"></div>
            </button>
        </div>
    );
};

export default React.memo(MacWindowControls);