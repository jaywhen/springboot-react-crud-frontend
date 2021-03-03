import React, { useEffect, useState } from 'react'
import { Table, Button, Avatar, Popconfirm, Modal } from "antd";
import axios from "axios";
import "./teacher-list.css";
import TeacherForm from '../TeacherForm';

// http://images.nowcoder.com/head/19m.png avatar url
export default function TeacherList() {
    // define dataSource
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    // CRUD -> D
    const handleDelete = (index) => {
        console.log(index)
        axios.delete('http://localhost:8080/teacher/deleteById/' + index.id)
             .then((rsp) => {
                 let tmpData = [...dataSource];
                 tmpData.splice(index.id, 1);
                 setDataSource(tmpData)
             })
             .catch((error) => {
                 console.log(error)
             }) 
    }

    // CRUD -> C
    const handleAdd = () => {
        setIsModalVisible(true)
    }

    // table header
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_,index) => {
                return(<Avatar src={ index.avatar } />) 
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Tel',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            render: (_,index) => 
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index)}>
                        <Button danger>Delete</Button>
                    </Popconfirm>
                ) : null
        }
    ]
    

    // 从子组件中获取 values
    const putData = (values) => {
        // 从子组件中获取 values
        console.log(values)
        axios.post('http://localhost:8080/teacher/save/', values)
             .then((rsp) => {
                 console.log(rsp)
             })
             .catch((error) => {
                 console.log(error)
             })
        let tmpData = [...dataSource];
        tmpData.push(values);
        setDataSource(tmpData)
        console.log("add" + tmpData)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/teacher/findAll')
             .then((rsp) => {
                 setDataSource(rsp.data);
             })
             .catch((error) => {
                 console.log(error)
             })
    }, [])
    return (
        <div className="teacher-list">
            <Button
                type="primary"
                onClick={() => handleAdd()}
                >
                Add a row
            </Button>
            <Modal 
                width={350} 
                title="Add a teacher" 
                visible={isModalVisible} 
                footer={[]}
                onCancel={handleCancel}
            >
                <TeacherForm putData={putData} />
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => {
                    return record.id
                }}
                dataSource={dataSource}
            />
        </div>
    )
}
