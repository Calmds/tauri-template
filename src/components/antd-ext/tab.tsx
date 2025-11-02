import React from 'react';
import { TabPaneProps, Tabs } from 'antd';

interface Tab extends Omit<TabPaneProps, 'tab'> {
    key: string;
    label: React.ReactNode;
}

interface TabLineExtProps {
    items: Tab[]
    onChange?: (activeKey: string) => void
}

const TabLineExt: React.FC<TabLineExtProps> = React.memo(props => (
    <Tabs onChange={props.onChange} type="line" centered animated={{ inkBar: true, tabPane: true }} items={props.items} />
));

export default TabLineExt;