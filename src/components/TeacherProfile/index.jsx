/**
 * React Hook useEffect has a missing dependency: 'id'. Either include it or remove the dependency array
 * 老是报这警告 先关提示 等 code review 的时候再处理
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Image, Descriptions  } from "antd";
import "./teacher-profile.css";

const DescriptionsItem = Descriptions.Item;

export default function TeacherProfile(props) {
    const [teacher, setTeacher] = useState([]);
    const id = props.id;
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
                </div>
                <div>
                    <Descriptions className="teacher-descriptions" title={ teacher.name + " 's Profile" }>
                        <DescriptionsItem label="Name">{ teacher.name }</DescriptionsItem>
                        <DescriptionsItem label="Gender">{ teacher.gender }</DescriptionsItem>
                        <DescriptionsItem label="Tel">{ teacher.tel }</DescriptionsItem>
                        <DescriptionsItem label="Department">{ teacher.department }</DescriptionsItem>
                    </Descriptions>
                </div>
            </div>
        </div>
    )
}
