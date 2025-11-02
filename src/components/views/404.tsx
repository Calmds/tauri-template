import React from 'react';
import { Result } from 'antd';
import { useNavigate } from "react-router-dom";
import { LinkButton } from '@/components/antd-ext';

const NotFoundPage: React.FC = () => {

    const navigate = useNavigate();
    const toFind = () => navigate(-1);

    return (<Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<LinkButton onClick={toFind}>返回</LinkButton>}
    />);
};

export default React.memo(NotFoundPage);