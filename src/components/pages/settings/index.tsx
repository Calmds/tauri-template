import { Breadcrumb } from "antd";
import React from "react";
import { connect, ConnectedProps } from "react-redux";

class SystemSettings extends React.Component<PropsFromRedux> {

    constructor(props: any) { super(props); }

    render() {
        return <div style={{ margin: "0 0 0 0" }}>
            <Breadcrumb items={[{ title: '/设置' }, { title: '设置' }]} />
        </div>
    }
}

const mapDispatchToProps = {};
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default React.memo(connector(SystemSettings));