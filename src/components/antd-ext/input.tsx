import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

interface IProps {
    index: number;
    item?: KeyValue;
    readOnly?: boolean;
    handleAdd: () => void;
    handleRemove: (index: number) => void;
    onChange: (index: number, field: keyof KeyValue, value: string) => void;
}

const Component = React.memo((props: IProps) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <Input
            placeholder="Key"
            spellCheck={false}
            value={props?.item?.key}
            readOnly={props.readOnly}
            style={{ marginRight: 2 }}
            name={`key_${props.index}`}
            onChange={(e) => props.onChange(props.index, 'key', e.target.value)}
        />
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>:</span>
        <Input
            placeholder="Value"
            spellCheck={false}
            name={`value_${props.index}`}
            value={props.item?.value?.toString()}
            style={{ marginRight: 2, marginLeft: 2 }}
            onChange={(e) => props.onChange(props.index, 'value', e.target.value)}
        />
        {
            props.index === 0
                ? <Button type='primary' size={"small"} shape="circle"
                    icon={<PlusOutlined />} onClick={props.handleAdd} />
                : null
        }
        {
            (props.index !== 0) && (
                <Button
                    danger
                    type='primary'
                    size={"small"}
                    shape="circle"
                    icon={<MinusOutlined />}
                    disabled={props?.item?.key && true || false}
                    onClick={() => props.handleRemove(props.index)} />
            )
        }
    </div>
));

export interface KeyValue {
    key: string;
    value: string | number | object | undefined;
}

interface RawKeyValueInputProps {
    items?: KeyValue[];
    onChange?: (values: KeyValue[]) => void;
}

/**
<Form.Item label="变量" name="variables" rules={[{ required: true, whitespace: true }]}>
    <RawKeyValueInput/>
</Form.Item> 
 */
const RawKeyValueInput: React.FC<RawKeyValueInputProps> = React.memo(({ items = [], onChange }) => {

    const [keyValuePairs, setKeyValuePairs] = React.useState<KeyValue[]>(items);

    const handleInputChange = (index: number, field: keyof KeyValue, newValue: string) => {
        // 原生传入的 KV 不允许更改 key，也不允许删除
        const updateValue = (items[index]?.key && field === 'value');
        if (!items[index]?.key || updateValue) {
            const newKeyValuePairs = [...keyValuePairs];
            newKeyValuePairs[index] = { ...newKeyValuePairs[index], [field]: newValue };
            setKeyValuePairs(newKeyValuePairs);
            onChange?.(newKeyValuePairs);
        }
    };

    const handleAdd = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
        onChange?.([...keyValuePairs, { key: '', value: '' }]);
    };

    const handleRemove = (index: number) => {
        const newKeyValuePairs = [...keyValuePairs];
        newKeyValuePairs.splice(index, 1);
        setKeyValuePairs(newKeyValuePairs);
        onChange?.(newKeyValuePairs);
    };

    return (
        <div>
            {
                keyValuePairs.length === 0 &&
                <Component
                    key={0}
                    index={0}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                    onChange={handleInputChange}
                />
            }
            {keyValuePairs.map((pair, index) => (
                <Component
                    key={index}
                    index={index}
                    item={pair}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                    onChange={handleInputChange}
                />
            ))}
        </div>
    );
});

export default RawKeyValueInput;