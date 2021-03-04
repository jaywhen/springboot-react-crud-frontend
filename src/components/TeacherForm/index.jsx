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
        }
    ]

    const departmentOps = [
        {
            label: "计算机与信息科学学院(智能科学学院)",
            value: "计算机与信息科学学院(智能科学学院)",
        },
        {
            label: "数学科学学院",
            value: "数学科学学院",
        },
        {
            label: "马克思主义学院",
            value: "马克思主义学院",
        }
    ]

    const onFinish = (values) => {
        let avatar = "http://images.nowcoder.com/head/"+ Math.floor(Math.random() * 101) + "m.png";
        let data = {
            "name": values.name,
            "tel": values.tel,
            "department": values.department[0],
            "gender": values.gender[0],
            "avatar": avatar,
        }
        props.putData(data)
    }

    return (
        <div>
            <Form style={{ width: 300 }} onFinish={ onFinish }>
                <FormItem
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="name" />
                </FormItem>
                <FormItem
                    label="Tel"
                    name="tel"
                    rules={[{ required: true, message: 'Please input your Tel!' }]}
                >
                    <Input placeholder="Tel" />
                </FormItem>
                <FormItem
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: 'Please choose your department!' }]}
                >
                    <Cascader options={departmentOps} />
                </FormItem>
                <FormItem
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
