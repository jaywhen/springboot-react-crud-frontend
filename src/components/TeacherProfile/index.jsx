/**
 * React Hook useEffect has a missing dependency: 'id'. Either include it or remove the dependency array
 * 老是报这警告 先关提示 等 code review 的时候再处理
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Image, Descriptions, Divider } from "antd";
import { GithubOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import "./teacher-profile.css";

const DescriptionsItem = Descriptions.Item;

export default function TeacherProfile(props) {
    const [teacher, setTeacher] = useState([]);
    const id = props.id;
    const labelStyle = {
        fontWeight: "600",
        fontFamily: "monospace",
    }
    useEffect(() => {
        axios.get("http://localhost:8080/teacher/findById/" + id)
             .then((rsp) => {
                 setTeacher(rsp.data);
             })
             .catch((error) => {
                 console.log(error);
             })
    }, []);
    return (
        <div className="outer-wrapper">
            <div className="inner-contianer">
                <div>
                    <Image className="teacher-avatar" src={ teacher.avatar } alt={ teacher.name } width={180} />
                    <div className="teacher-name">
                        { teacher.name }
                    </div>
                    <div className="teacher-tel">
                        <div>☎：</div>
                        <div>{ teacher.tel }</div>
                    </div>
                    <div className="links">
                        <a href={teacher.github} target="_blank" rel="noreferrer" ><GithubOutlined /></a>
                        <a href={teacher.blog} target="_blank" rel="noreferrer"><UserOutlined /></a>
                        <a href={"mailto:"+teacher.email} target="_blank" rel="noreferrer"><MailOutlined /></a>
                    </div>
                </div>
                <Divider type="vertical" style={{ height: "460px", marginTop: "10px", marginLeft: "25px" }} />
                <div className="teacher-descriptions">
                    <Descriptions labelStyle={labelStyle} column={1} title={ teacher.bio }>
                        <DescriptionsItem label="Gender">{ teacher.gender }</DescriptionsItem>
                        <DescriptionsItem label="Title">{ teacher.title }</DescriptionsItem>
                        <DescriptionsItem label="Undergraduate">{ teacher.undergraduate }</DescriptionsItem>
                        <DescriptionsItem label="Master">{ teacher.master }</DescriptionsItem>
                        <DescriptionsItem label="PhD">{ teacher.phd }</DescriptionsItem>
                        <DescriptionsItem label="Department">{ teacher.department }</DescriptionsItem>
                        <DescriptionsItem label="Address">{ teacher.address }</DescriptionsItem>
                        <DescriptionsItem label="Project">{ teacher.project }</DescriptionsItem>
                    </Descriptions>
                </div>
            </div>
        </div>
    )
}
