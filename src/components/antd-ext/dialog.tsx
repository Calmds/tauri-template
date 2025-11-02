import { Modal, Space } from "antd";
import React from "react";

type Callback = (confirmed: boolean) => void;

/**
 * <pre><code>
 *     const Columns: TableColumnsType<DatabaseItem> = [
 *        { title: '序号', align: 'center', key: 'index', dataIndex: 'index', rowScope: 'row', render: (_, _r, index) => index + 1 },
 *        { title: '配置别名', key: "aliasName", dataIndex: 'aliasName' },
 *        { title: '连接地址', key: "id", render: (_, record) => (<Link>{record.hostname + ":" + record.port}</Link>) },
 *        { title: '数据库类型', key: "type", dataIndex: 'type' },
 *        { title: '用户名', key: "username", dataIndex: 'username' },
 *        { title: '记录时间', key: "createTime", dataIndex: 'createTime', render: text => text },
 *        {
 *            title: 'Action',
 *            key: 'action',
 *            render: (_, record) => (<Space size="middle">
 *                <DeleteDialog target={record.aliasName} onConfirmed={async () => handleRemove(record)} />
 *                <a onClick={() => handleUpdate(record)}>修改</a>
 *            </Space>),
 *        },
 *    ];
 * </code></pre>
 * 
 * @param props {target: string | number, onConfirmed: Callback}
 * @returns ReactNode
 */

interface IProps {
    target?: string | number,
    onConfirmed: Callback
}

export const DeleteDialog: React.FC<IProps> = React.memo(props => {

    const [modal, contextHolder] = Modal.useModal();

    return (<div >
        <a
            style={{ color: '#B03060' }}
            onClick={async () => {
                const confirmed = await modal.confirm({
                    content: `请确认是否要删除 ${props.target}?`,
                    title:
                        <Space size="small">
                            <span>⚠️警告</span>
                            <small style={{ color: 'red', backgroundColor: 'yellow' }}>此操作不可逆</small>
                        </Space>,
                });
                if (confirmed) props.onConfirmed(confirmed);
            }
            }>删除</a>
        {contextHolder}
    </div >);
});

export const ConfirmeDialog: React.FC<{ text: string, title: string, content: string, callback: Callback }> = React.memo(props => {

    const [modal, contextHolder] = Modal.useModal();

    return (<div >
        <a onClick={async () => {
            const confirmed = await modal.confirm({
                content: props.content,
                title: props.title,
            });
            props.callback(confirmed);
        }
        }>{props.text}</a>
        {contextHolder}
    </div >);
});

