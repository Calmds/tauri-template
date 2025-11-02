import React from "react";
import routers from "@/layout/routes";
import { useRoutes } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

const AuthInterceptor: React.FC<PropsFromRedux> = _props => {

    // const location = useLocation();
    const elements = useRoutes(routers); // 先调用所有Hooks

    // 已登录，但，访问了登录页面
    // if (location.pathname === "/signin") return <Redirect2IndexPage />;

    // 未登录
    // if (location.pathname !== "/signin") return <Redirect2IndexPage />;

    return elements;
}

const mapStateToProps = (_state: Immutable.Map<string, any>, _ownProps: {}) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default React.memo(connector(AuthInterceptor));