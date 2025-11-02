import { Layout, Watermark } from 'antd';
import { Outlet } from "react-router-dom";
import ContextMenu from '@/components/ctx-menu';
import React, { useCallback, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { updateSelectedText } from '@/actions/clipboard';
import AssistiveTouch from '../components/assistive-touch';
import { getThemeConcfigFromStore } from '@/actions/theme';
import { Position } from '@/components/assistive-touch/types';
import MacWindowControls from '@/components/mac_window_controls';
import "./index.css";

const { Content } = Layout;

const DefaultLayout: React.FC<Props> = props => {

    const fetchThemeConfig = useCallback(() => {
        props.getThemeConcfigFromStore();
    }, [props.getThemeConcfigFromStore]);

    useEffect(() => { fetchThemeConfig(); }, [fetchThemeConfig]);

    // 处理选择文本
    const handleTextSelection = useCallback(async () => {
        // 使用 setTimeout 确保能获取到最新的选区
        setTimeout(async () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim() || '';
            if (!text) return;
            props.updateSelectedText(text.trim());
        }, 100);

    }, [props.selectedText]);


    return (
        <Watermark content={['Watermark', 'mail@qq.com']} >
            <Layout hasSider>
                <Layout className='layout-ext'>
                    <Content className='content' onMouseUp={handleTextSelection} onKeyUp={handleTextSelection}>
                        <Outlet />
                        <AssistiveTouch position={Position.BottomLeft} />
                        <ContextMenu />
                        <MacWindowControls />
                    </Content>
                </Layout>
            </Layout>
        </Watermark >
    );
};

const mapStateToProps = (state: Immutable.Map<string, any>, _ownProps: {}) => ({
    selectedText: state.getIn(['reducers', 'selectedText']) as string,
});

const mapDispatchToProps = { getThemeConcfigFromStore, updateSelectedText };

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default React.memo(connector(DefaultLayout));
