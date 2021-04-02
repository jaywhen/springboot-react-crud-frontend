import React from 'react'
import { Form, Input, Cascader, Button, Col, Row, Switch } from "antd";
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

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const gutter = {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
    }

    return (
        <div>
            <Form
                {...layout}
                initialValues={props.values} 
                style={{ width: 650 }} 
                onFinish={ onFinish }>
                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="name"
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder="name" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="tel"
                                label="Tel"
                                name="tel"
                                rules={
                                    [
                                        {
                                            required: true,
                                            max: 11,
                                            whitespace: true,
                                            message: '请输入11位数电话号码'
                                        },
                                        {
                                            required: true,
                                            pattern: /^[0-9]+$/,
                                            message: '请输入数字'
                                        }
                                    ]
                                }
                            >
                                <Input placeholder="Tel" />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="department"
                                label="Department"
                                name="department"
                                rules={[{ required: true, message: 'Please choose your department!' }]}
                            >
                                <Cascader options={departmentOps} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="gender"
                                label="Gender"
                                name="gender"
                                rules={[{ required: true, message: 'Please choose your gender!' }]}
                            >
                                <Cascader options={genderOps} style={{ width: 80 }} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="email"
                                label="Email"
                                name="email"
                                rules={
                                    [
                                        {
                                            required: true,
                                            whitespace: true,
                                            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                                            message: "请输入正确的 email 格式",
                                        }
                                    ]
                                }
                            >
                                <Input placeholder="Email" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="address"
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your address",
                                    }
                                ]}
                            >
                                <Input placeholder="Address" />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="undergraduate"
                                label="Undergraduate"
                                name="undergraduate"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your undergraduate",
                                    }
                                ]}
                            >
                                <Input placeholder="undergraduate" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="master"
                                label="Master"
                                name="master"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your master",
                                    }
                                ]}
                            >
                                <Input placeholder="master" />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="phd"
                                label="PhD"
                                name="phd"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your PhD",
                                    }
                                ]}
                            >
                                <Input placeholder="PhD" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="github"
                                label="Github"
                                name="github"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your github",
                                    }
                                ]}
                            >
                                <Input placeholder="github" />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="bio"
                                label="Bio"
                                name="bio"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your bio",
                                    }
                                ]}
                            >
                                <Input placeholder="Bio" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="title"
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your title",
                                    }
                                ]}
                            >
                                <Input placeholder="title" />
                            </FormItem>
                        </Col>
                        
                    </Row>

                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="project"
                                label="Project"
                                name="project"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your project",
                                    }
                                ]}
                            >
                                <Input placeholder="project" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="blog"
                                label="Blog"
                                name="blog"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter your blog",
                                    }
                                ]}
                            >
                                <Input placeholder="blog" />
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row gutter={gutter}>
                        <Col span={12}>
                            <FormItem
                                className="IEEEFellow"
                                label="IEEE Fellow"
                                name="IEEEFellow"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Switch checkedChildren="是" unCheckedChildren="否" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                className="tel"
                                label="Tel"
                                name="tel"
                            >
                                <Input.TextArea placeholder="Tel" />
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem>
                        <Button style={{ width: "650px" }} htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </FormItem> 
            </Form>
        </div>
    )
}
