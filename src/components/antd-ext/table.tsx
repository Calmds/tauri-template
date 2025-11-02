import React, { JSX, useState } from 'react';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { Form, FormInstance, Input, Space, Table, TablePaginationConfig } from 'antd';

export type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';

interface TableColumnsType<T> extends ColumnType<T> {
    editable?: boolean;
    required?: boolean;
    operation?: boolean;
    dataType?: RuleType;
    children?: ColumnsType<T>;
    onEditRender?: (record: T, form: FormInstance<T>) => React.ReactNode | JSX.Element | any;
}

interface EditableTableProps<T> {
    size?: 'small' | 'middle' | 'large';
    dataSource: T[];
    actions?: React.ReactNode;
    columns: TableColumnsType<T>[];
    bordered?: boolean;
    showRemove?: boolean;
    style?: React.CSSProperties;
    pagination?: false | TablePaginationConfig;
    onRemove: (row: T) => void,
    onUpdate: (row: T) => void,
}

const DEFAULT_KEY = -999;

/**
 *  使用方式
 * 
 * <EditableTable
 *      showRemove
 *      size="small"
 *      dataSource={templates}
 *      style={{ marginTop: "5px" }}
 *      onRemove={handleRemove}
 *      onUpdate={handleUpdate}
 *      columns={[
 *          {
 *              dataIndex: 'filename', title: '文件名', editable: true,
 *              render: (_: any, item: Template) => item.extension && item.filename + "." + item.extension || item.filename
 *          },
 *          { dataIndex: 'filepath', title: '生成目录', editable: true },
 *          {
 *              dataIndex: 'func', title: '文件类别', editable: true,
 *              render: (func: string) => Functional.filter(f => f.value === func).map(f => f.label),
 *              onEditRender: () => <Select placeholder="源码功能或类别" options={Functional} />,
 *          },
 *          {
 *              dataIndex: 'language', title: '工程语言', editable: true,
 *              onEditRender: (_, form) => <Select placeholder="工程语言" options={Languags} onChange={() => handleLanguageChange(form)} />
 *          },
 *          {
 *              dataIndex: 'framework', title: '工程框架', editable: true,
 *              onEditRender: () => <Select placeholder="源码功能或类别" options={frameworks} />,
 *          },
 *          {
 *              dataIndex: 'project', title: '工程别名', editable: true,
 *              onEditRender: () => <Select placeholder="工程别名" options={projectList} />
 *          },
 *          { dataIndex: 'createTime', title: '创建时间' },
 *      ]}
 *      pagination={{
 *          size: "small",
 *          total: page.rows,
 *          showSizeChanger: false,
 *          pageSize: page.pageSize,
 *          defaultCurrent: page.pageNum,
 *          onChange: (page, pageSize) => onChange(page, pageSize),
 *      }}
 *   />
 */
const EditableTable = React.memo(<T extends { id: number }>(props: EditableTableProps<T>) => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<number>(DEFAULT_KEY);

    const isEditing = (record: T) => record.id === editingKey;

    const edit = (record: T) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => setEditingKey(DEFAULT_KEY);

    const handleUpdate = async (record: T) => {
        await form.validateFields().then(formRecord => {
            props.onUpdate({ ...record, ...formRecord });
            setEditingKey(DEFAULT_KEY);
        }).catch(console.log);
    };

    return (
        <Form form={form} component={false}>
            <Table
                rowKey={"id"}
                size={props.size}
                style={props.style}
                bordered={props.bordered}
                dataSource={props.dataSource}
                pagination={props.pagination}
                rowClassName="editable-row"
            >
                <Table.Column title={"序号"} render={(_text, _record, idx) => idx + 1} align="center" />
                {props.columns.filter(col => !col.operation).map((col) => (
                    <Table.Column
                        key={col.key}
                        title={col.title}
                        align={col.align}
                        dataIndex={col.dataIndex}
                        render={(text, record, idx) => {
                            if (isEditing(record)) {
                                return (
                                    <Form.Item
                                        style={{ margin: 0 }}
                                        name={col.dataIndex?.toString()}
                                        rules={[
                                            {
                                                required: col.required || true,
                                                type: col.dataType || 'string',
                                                message: `${col.title}不能为空`,
                                                whitespace: true
                                            }
                                        ]}>
                                        {
                                            col.onEditRender && col.onEditRender(record, form)
                                            ||
                                            (col.editable && <Input spellCheck={false} placeholder={col.title?.toString()} /> || text)
                                        }
                                    </Form.Item>
                                );
                            }
                            return col.render && col.render(text, record, idx) || text;
                        }}
                    />
                ))}

                <Table.Column
                    title={<Space><span>Operation</span>{props.actions}</Space>}
                    dataIndex="operation"
                    render={(text: any, record: T, idx: number) => {
                        if (isEditing(record)) {
                            return (<Space>
                                <a onClick={() => handleUpdate(record)}>保存修改</a>
                                <a onClick={cancel}>取消修改</a>
                            </Space>);
                        }

                        if (editingKey === DEFAULT_KEY) {
                            const operationColumns = props.columns.filter(col => col.operation && col.render);

                            return (<Space>
                                <a onClick={() => edit(record)}>编辑</a>
                                {
                                    // 用户的操作按钮
                                    operationColumns.length > 0 && (
                                        <React.Fragment>
                                            {operationColumns.map(col => {
                                                const renderedElement = col.render && col.render(text, record, idx);
                                                return React.isValidElement(renderedElement) && renderedElement
                                            })}
                                        </React.Fragment>
                                    )
                                }
                                {/* {props.showRemove && <DeleteDialog onConfirmed={() => props.onRemove(record)} />} */}
                            </Space>);
                        }

                        return null;
                    }}
                />
            </Table>
        </Form>
    );
});

export default EditableTable;
