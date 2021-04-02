import Layout, { Content, Footer } from 'antd/lib/layout/layout';
import React from 'react'
import FooterGroup from '../../components/FooterGroup';
import TeacherProfile from '../../components/TeacherProfile'
import "./profile.css";
export default function Profile(props) {
    return (
        <Layout style={{ height: "100vh", backgroundColor: "white" }}>
            <Content style={{ alignSelf: "center" }}>
                <TeacherProfile id={props.match.params.id} />
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
                <FooterGroup />
            </Footer>
        </Layout>
    )
}