import React from 'react'
import TeacherProfile from '../../components/TeacherProfile'
import "./profile.css";
export default function Profile(props) {
    return (
        <div className="profile-page">
            <TeacherProfile id={props.match.params.id} />
        </div>
    )
}
