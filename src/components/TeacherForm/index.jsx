import React from 'react'
import { Form, Input, Cascader, Button } from "antd";
const FormItem = Form.Item;


export default function TeacherForm(props) {
    const genderOps = [
        {
            label: "男",
            value: "男",
        },
        {
            label: "女",
            value: "女"
        },
        {
            label: "外星人",
            value: "外星人"
        },
    ]

    const departmentOps = [
        {
            label: "计算机与信息科学学院",
            value: "计算机与信息科学学院",
        },
        {
            label: "数学科学学院",
            value: "数学科学学院",
        },
        {
            label: "历史与社会学院",
            value: "历史与社会学院",
        },
        {
            label: "马克思主义学院",
            value: "马克思主义学院",
        }
        ,
        {
            label: "化学学院",
            value: "化学学院",
        },
        {
            label: "文学院",
            value: "文学院",
        },
        {
            label: "外国语学院",
            value: "外国语学院",
        },
        {
            label: "物理与电子工程学院",
            value: "物理与电子工程学院",
        },
    ]

    const onFinish = (values) => {
        let data = values;
        data["department"] = values.department[0];
        data["gender"] = values.gender[0];
        // 如果没有表单数据传过来 => add
        if(!props.values) {
            let avatar = "http://images.nowcoder.com/head/"+ Math.floor(Math.random() * 101) + "m.png";
            data["avatar"] = avatar;
            props.handleAdd(data);
            props.onAddSubmit();
        } else {
            // 有表单数据传来 => update
            // 将数据返回给父组件
            data["id"] = props.values.id;
            data["avatar"] = props.values.avatar;
            props.handleUpd(data);
            props.onUpdSubmit();
        }
    }

    return (
        <div>
            <Form
                initialValues={props.values} 
                style={{ width: 300 }} 
                onFinish={ onFinish }>
                <FormItem
                    className="name"
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="name" />
                </FormItem>
                <FormItem
                    className="tel"
                    label="Tel"
                    name="tel"
                    rules={[{ required: true, message: 'Please input your Tel!' }]}
                >
                    <Input placeholder="Tel" />
                </FormItem>
                <FormItem
                    className="department"
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: 'Please choose your department!' }]}
                >
                    <Cascader options={departmentOps} />
                </FormItem>
                <FormItem
                    className="gender"
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please choose your gender!' }]}
                >
                    <Cascader options={genderOps} style={{ width: 80 }} />
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </FormItem>
                
            </Form>
        </div>
    )
}
