import React from 'react';
import { ConfigProvider } from 'antd';
import locale from "antd/locale/zh_CN";
import { ConnectedProps, connect } from 'react-redux';
import { ThemeConfigProvider } from "@/components/models/antd-ext";

const AntdConfigProvider: React.FC<Props> = props => {

    return (
        <ConfigProvider locale={locale} theme={{ algorithm: props.theme.theme?.algorithm }} >
            {props.children}
        </ConfigProvider>
    );
};

// 当前页面私有状态，可以通过 <CurrentComponent xxx={yyy}/> 来传递的数据。
type OwnProps = { children?: React.ReactNode };

const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: OwnProps) => ({
    theme: state.getIn(["reducers", "theme"]) as ThemeConfigProvider,
    children: ownProps.children,
});

const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & OwnProps;
export default React.memo(connector(AntdConfigProvider));
