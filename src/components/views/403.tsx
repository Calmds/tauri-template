import React from 'react';
import { Result } from 'antd';
import { useNavigate } from "react-router-dom";
import { LinkButton } from '@/components/antd-ext';

const ForbiddenPage: React.FC = () => {

    const navigate = useNavigate();
    const toFind = () => navigate(-1);

    return (<Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<LinkButton onClick={toFind}>返回</LinkButton>}
    />);
};

export default React.memo(ForbiddenPage);