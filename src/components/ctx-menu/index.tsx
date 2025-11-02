import { ConnectedProps, connect } from 'react-redux';
import { isInputElement, pasteToElement } from '@/utility/html';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { readText, writeText } from '@tauri-apps/plugin-clipboard-manager';
import './index.css';

// 对输入框右键时会出现全选的问题，暂时不处理
const ContextMenu = (props: Props) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 计算调整后的位置
    const calculateAdjustedPosition = useCallback((clientX: number, clientY: number) => {
        if (!menuRef.current) return { x: clientX, y: clientY };

        const menu = menuRef.current;
        const rect = menu.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        let adjustedX = clientX;
        let adjustedY = clientY;

        // 水平边界检测
        if (clientX + rect.width > (innerWidth / 2)) {
            adjustedX = clientX - rect.width;
        }

        // 垂直边界检测
        if (clientY + rect.height > (innerHeight / 2)) {
            adjustedY = clientY - rect.height;
        }

        return { x: adjustedX, y: adjustedY };
    }, []);

    // 显示右键菜单（处理原生事件）
    const handleContextMenu = useCallback((event: MouseEvent) => {
        event.preventDefault();
        const adjustedPos = calculateAdjustedPosition(event.clientX, event.clientY);
        setPosition(adjustedPos);
        setIsVisible(true);
    }, [calculateAdjustedPosition]);

    // 显示右键菜单（处理React事件）
    const handleReactContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const adjustedPos = calculateAdjustedPosition(event.clientX, event.clientY);
        setPosition(adjustedPos);
        setIsVisible(true);
    }, [calculateAdjustedPosition]);

    // 隐藏右键菜单
    const hideContextMenu = useCallback(() => { setIsVisible(false); }, []);

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', hideContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', hideContextMenu);
        };
    }, [handleContextMenu, hideContextMenu]);

    // 复制选中文本
    const handleCopy = useCallback(async () => {
        if (!props.selectedText) return;
        await writeText(props.selectedText.trim());
        hideContextMenu();
    }, [props.selectedText]);

    // 粘贴功能 - 使用 useCallback 包装并添加依赖
    // 在你的主组件中，确保输入框是受控组件 或者在 ContextMenu 中添加状态同步
    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await readText();
            if (!clipboardText) return;

            const activeElement = document.activeElement as HTMLElement;

            if (isInputElement(activeElement)) {
                pasteToElement(activeElement, clipboardText);

                // 额外触发一次自定义事件，确保 React 状态更新
                const customEvent = new CustomEvent('reactInput', {
                    detail: { value: clipboardText },
                    bubbles: true
                });
                activeElement.dispatchEvent(customEvent);
            } else {
                const allInputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
                if (allInputs.length > 0) {
                    const lastInput = allInputs[allInputs.length - 1] as HTMLElement;
                    pasteToElement(lastInput, clipboardText);

                    // 同样触发自定义事件
                    const customEvent = new CustomEvent('reactInput', {
                        detail: { value: clipboardText },
                        bubbles: true
                    });
                    lastInput.dispatchEvent(customEvent);

                    lastInput.focus();
                }
            }
        } catch (error) {
            console.error('粘贴失败:', error);
        } finally {
            hideContextMenu();
        }
    }, [hideContextMenu]);

    return (
        <div className='selectable-text' onContextMenu={handleReactContextMenu}>
            {/* 右键菜单 */}
            {isVisible && (
                <div
                    ref={menuRef}
                    className="context-menu"
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-item" onClick={() => window.location.reload()}>
                        <i></i>
                        <span>刷新页面</span>
                    </div>

                    <div className="menu-item" onClick={handleCopy}>
                        <i></i>
                        <span>复制</span>
                    </div>

                    <div className="menu-item" onClick={handlePaste}>
                        <i></i>
                        <span>粘贴</span>
                    </div>

                    <div className="menu-divider"></div>

                    <div className="menu-item" >
                        <i></i>
                        <span>删除</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: Immutable.Map<string, any>, _ownProps: {}) => ({
    selectedText: state.getIn(['reducers', 'selectedText']) as string,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default React.memo(connector(ContextMenu));