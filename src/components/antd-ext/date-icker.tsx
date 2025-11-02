import React from 'react';
import { DatePicker, Form } from 'antd';

const { RangePicker } = DatePicker;

// <DateRangePicker name="rangeDate" style={{ width: "30%", marginLeft: "10px" }} />
const DateRangePicker: React.FC<{ name?: string, required?: boolean, style?: React.CSSProperties }> = props => {
    // 获取当前日期
    const today = new Date();

    // 禁用大于当前日期的日期
    const disabledDate = (current: any) => current && current > today;

    return (<Form.Item
        label="日期范围"
        name={"rangeDate"}
        style={{ ...props.style }}
        rules={[{ type: 'array', required: props.required, message: "请选择日期范围" }]}>
        <RangePicker allowClear format="YYYY-MM-DD" disabledDate={disabledDate} />
    </Form.Item>);
};

export default React.memo(DateRangePicker);
