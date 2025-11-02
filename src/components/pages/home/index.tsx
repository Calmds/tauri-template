import React from "react";
import { Breadcrumb } from "antd";
import { connect, ConnectedProps } from "react-redux";
// import { DashboardOutlined, BarChartOutlined, UnorderedListOutlined, FileWordOutlined, } from '@ant-design/icons';

class IndexComponent extends React.Component<PropsFromRedux> {

    constructor(props: any) { super(props); }

    render() {
        return <div>
            <Breadcrumb items={[{ title: '/首页' }]} />
        </div>
    }
}

const mapDispatchToProps = {};
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default React.memo(connector(IndexComponent));