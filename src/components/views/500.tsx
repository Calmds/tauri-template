import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '@/components/antd-ext';

const InternalServerError: React.FC = () => {

    const navigate = useNavigate();
    const toFind = () => navigate(-1);

    return (<Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<LinkButton onClick={toFind}>返回</LinkButton>}
    />);
};

export default React.memo(InternalServerError);
