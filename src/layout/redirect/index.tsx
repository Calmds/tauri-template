import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 去往首页的组件
 * @returns React.ReactElement | null
 */
export const Redirect2IndexPage: React.FC = React.memo(() => {
    const location = useLocation();
    if (location.pathname !== "/") {
        const navigateTo = useNavigate();
        navigateTo("/");
    }
    return <div></div>;
});

