import React, { useEffect, useState } from 'react'
import { Table, Button, Avatar, Popconfirm, Modal, Select } from "antd";
import axios from "axios";
import "./teacher-list.css";
import TeacherForm from '../TeacherForm';
import { Link } from 'react-router-dom';
import { updDataValidate } from '../../Util';

const {Option} = Select;

export default function TeacherList(props) {
    // define dataSource && some states
    const [dataSource, setDataSource] = useState([]);
    const [updVal, setUpdVal] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdModalVisible, setIsUpdModalVisible] = useState(false);
    const [searchText, setSearchText] = useState(undefined);
    const [searchData, setSearchData] = useState([]);

    // utils
    const delFromArrayByItemElm = (arr, id) => {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].id === id) return i;
        }
    }

    /**
     * 
     * @param {Array} arr 
     * @param {Object} item 
     * @returns 
     */
    const updArrayByItem = (arr, item) => {
        let newArr = arr.map((arrItem) => {
            if(arrItem.id === item.id) { return item; }
            else { return arrItem; }
        });
        return newArr;
    }

    /**
     * Query by name
     * @param {string} key 
     * @param {Array} arr
     */
    const fuzzyQuery = (arr, key) => {
        let fuzzyArr = [];
        arr.forEach(element => {
            if(element.name.indexOf(key) >= 0) {
                fuzzyArr.push(element);
            }
        });
        return fuzzyArr;
    }

    /**
     * 
     * @param {Array} arr 待更新的数组
     * @param {Object} item arr 数组中需要更新的项
     * @returns {Array} newArr 一个新的已被更新的数组
     */ 
    
    // index data
    useEffect(() => {
        axios.get("http://localhost:8080/teacher/findAll")
             .then((rsp) => {
                 setDataSource(rsp.data);
             })
             .catch((error) => {
                 console.log(error)
             })
    }, []);

    // CRUD -> D
    const handleDelete = (index) => {
        axios.delete('http://localhost:8080/teacher/deleteById/' + index.id)
             .then((rsp) => {
                 let tmpData = [...dataSource];
                 let i = delFromArrayByItemElm(tmpData ,index.id);
                 tmpData.splice(i, 1);
                //  console.log(tmpData)
                 setDataSource(tmpData)
             })
             .catch((error) => {
                 console.log(error)
             }) 
    }

    // CRUD -> C
    const handleAdd = (value) => {
        axios.post('http://localhost:8080/teacher/save/', value)
             .then((rsp) => {
                let tmpData = [...dataSource];
                tmpData.push(rsp.data.userData);
                console.log(rsp.data.userData);
                setDataSource(tmpData);
             })
             .catch((error) => {
                console.log(error)
             })
    }

    // CRUD -> U
    const handleUpd = (value) => {
        axios.put('http://localhost:8080/teacher/update/', value)
             .then((rsp) => {
                 // 替换原来 dataSource 中的item
                 let tmpData = updArrayByItem([...dataSource], value);
                 setDataSource(tmpData);
             })
             .catch((error) => {
                 console.log(error)
             })
    }

    const onUpdClick = index => {
        // 处理特殊数据
        // index.department = [index.department]
        // index.joinDate = moment(index.joinDate, 'YYYY/MM')
        // index.gender = [index.gender];
        let data = updDataValidate(index);
        // console.log("index data: ",index);
        setIsUpdModalVisible(true);
        setUpdVal(data);
    }

    // CRUD -> R
    const onSearch = value => {
        if(value) {
            setSearchText(value);
            let tmpData = fuzzyQuery(dataSource, value);
            setSearchData(tmpData);
        }        
    }

    const onClickSearchItem = value => {
        let path = "/profile/" + value;
        props.history.push(path);
        setSearchData([]);
    }

    // table header
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_,index) => {
                return(
                    <Link to={`/profile/${index.id}`}>
                        <Avatar src={ index.avatar } />
                    </Link>
                ) 
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
                    <div className="del-update-container">
                        <Button size="small" type="primary" onClick={() => onUpdClick(index)}>Update</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index)}>
                            <Button style={{ marginLeft: 5 }} size="small" danger type="primary">Delete</Button>
                        </Popconfirm>
                    </div>
                ) : null
        }
    ]

    const onAddSubmit = () => {
        setIsAddModalVisible(false)
    }

    const onUpdSubmit = () => {
        setIsUpdModalVisible(false)
    }

    return (
        <div className="teacher-list">
            <div className="add-search-container">
                <Button
                    type="primary"
                    onClick={() => setIsAddModalVisible(true)}
                    >
                    Add a row
                </Button>
                <Select
                    style={{ width: 200 }}
                    placeholder="input search text" 
                    showSearch
                    showArrow={false}
                    filterOption={false}
                    notFoundContent="这里嘛也没有~🙄"
                    value = {searchText}
                    onSearch={onSearch}
                    onChange={onClickSearchItem}
                >
                    { searchData.map(d => (
                        <Option key={d.id}>{d.name}</Option>
                    )) 
                    }
                </Select>
            </div>
            
            <Modal 
                style={{ display: "flex", justifyContent: "center" }}
                destroyOnClose={true} 
                title="Add a teacher" 
                visible={isAddModalVisible} 
                footer={[]}
                onCancel={() => setIsAddModalVisible(false)}
            >
                <TeacherForm  handleAdd={handleAdd} onAddSubmit={onAddSubmit} />
            </Modal>

            <Modal 
                style={{ display: "flex", justifyContent: "center" }}
                destroyOnClose={true}
                title="Update a teacher" 
                visible={isUpdModalVisible} 
                footer={[]}
                onCancel={() => setIsUpdModalVisible(false)}
            >
                <TeacherForm handleUpd={handleUpd} values={updVal} onUpdSubmit={onUpdSubmit} />
            </Modal>

            <Table
                columns={columns}
                rowKey={(record) => {
                    return record.id
                }}
                dataSource={dataSource}
                scroll={{ y: "470px" }}
            />
        </div>
    )
}
