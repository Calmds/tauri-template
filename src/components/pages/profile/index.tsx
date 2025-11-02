import React from "react";
import { Breadcrumb } from "antd";
import { connect, ConnectedProps } from "react-redux";

class UserManagement extends React.Component<Props> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div style={{ margin: "0 0 0 0" }}>
            <Breadcrumb items={[{ title: '账号信息' }, { title: '账号信息' }]} />
        </div>
    }
}

const mapDispatchToProps = {};
const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default React.memo(connector(UserManagement));