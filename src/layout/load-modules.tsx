import React from 'react';
import { Spin } from "antd";
import { lazy, Suspense } from 'react';

export const loadableReact = (factory: Parameters<typeof lazy>[0]) => () => {
    const Component = lazy(factory);

    //  定义要传递给LazyComponent的props
    const componentProps = {};

    return (
        <Suspense fallback={< Spin size="large" style={{
            margin: "0 auto",
            fontWeight: 200,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
        }
        } />}>
            <Component {...componentProps} />
        </Suspense>
    );
};

export const asyncModule = (factory: Parameters<typeof lazy>[0]) => React.createElement(loadableReact(factory));
export default { loadableReact, asyncModule };