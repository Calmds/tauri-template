import { theme } from 'antd';
import { Petal } from './petal';
import { ThemeIcon } from '@/utility/icons';
import { useNavigate } from 'react-router-dom';
import { changeTheme } from '../../actions/theme';
import React, { useState, useEffect, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { getPosition, Position } from '@/components/assistive-touch/types';
import { ThemeConfigProvider, ThemeEnum } from '@/components/models/antd-ext';
import { SettingOutlined, UserOutlined, HomeOutlined, DesktopOutlined } from "@ant-design/icons";
import './index.css';

const { darkAlgorithm, defaultAlgorithm } = theme;

const AssistiveTouch: React.FC<Props> = props => {

    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const initialPosition = props.position ? getPosition(props.position) : getPosition(Position.Center);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState(initialPosition);

    const navigate = useNavigate();

    // 使用 useCallback 避免函数重复创建
    const getWindowSize = useCallback(async () => {
        const size = await getCurrentWindow().innerSize();
        setWindowSize({ width: size.width / 2, height: size.height / 2 });
    }, []);

    // 窗口大小初始化和监听单独处理
    useEffect(() => {
        getWindowSize();
        const unlisten = getCurrentWindow().onResized(async () => await getWindowSize());
        return () => { unlisten.then((f) => f()); };
    }, [getWindowSize]); // 只依赖 getWindowSize

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) {
                const newX = event.clientX - offset.x;
                const newY = event.clientY - offset.y;

                const border = windowSize.height > newY && windowSize.width > newX;
                if (border && newX > 10 && newY > 10) {
                    setPosition({ x: newX, y: newY });
                }
            }
        };

        const handleMouseUp = () => setIsDragging(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset, windowSize]); // 移除 position 依赖

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); // 阻止默认行为，避免出现选中文本等情况
        setIsDragging(true);
        const offsetX = event.clientX - position.x;
        let offsetY = event.clientY - position.y;
        setOffset({ x: offsetX, y: offsetY });
    };

    // 阻止右键点击默认行为，避免显示浏览器的上下文菜单
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.preventDefault();

    // 阻止拖拽事件的默认行为
    const preventDragHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

    const showHomePage = () => {
        if (location.pathname != '/') {
            navigate('/');
        }
    };

    // 显示设置页面
    const showSettingPage = () => navigate('/settings');

    // 显示用户管理页面
    const showUserManagementPage = async () => navigate('/profile');

    // 切换主题
    const changeTheme = () => {
        if (props.theme.themeName === ThemeEnum.Light) {
            props.changeTheme(darkAlgorithm);
            return;
        }

        props.changeTheme(defaultAlgorithm);
    }

    return (
        <div
            className="profile-floating-ball"
            onMouseDown={handleMouseDown}
            onDragStart={preventDragHandler}
            onContextMenu={handleContextMenu}
            style={{ left: position.x, top: position.y }
            }>

            {/* 主花蕊 */}
            < div className="main-bud" >
                {/* 中心图标 */}
                < DesktopOutlined style={{ fontSize: '30px' }} />
                {/* 圆环 */}
                <div className="bud-ring" >
                    {/* 子悬浮球 */}
                    < div className="child-balls" >
                        <Petal index={0} tipText={"设置"} onClick={showSettingPage} children={< SettingOutlined style={{ fontSize: '20px' }} />} />
                        <Petal index={1} tipText={"账号信息"} onClick={showUserManagementPage} children={< UserOutlined style={{ fontSize: '20px' }} />} />
                        <Petal index={2} tipText={"切换主题"} onClick={changeTheme} children={< ThemeIcon />} />
                        < Petal index={3} tipText={"回到主页"} onClick={showHomePage} children={< HomeOutlined style={{ fontSize: '20px' }} />} />
                    </div>
                    {/* 子悬浮球 */}
                </div>
                {/* 圆环 */}
            </div>
        </div >
    );
};

const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: { position?: Position }) => ({
    theme: state.getIn(["reducers", "theme"]) as ThemeConfigProvider,
    position: ownProps.position,
});

const mapDispatchToProps = { changeTheme };
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default React.memo(connector(AssistiveTouch));