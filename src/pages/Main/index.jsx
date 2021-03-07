import React from 'react'
import TeacherList from '../../components/TeacherList'
import "./main.css"
export default function Main(props) {
    return (
        <div className="main-page">
            <TeacherList history={ props.history } />
        </div>
    )
}
