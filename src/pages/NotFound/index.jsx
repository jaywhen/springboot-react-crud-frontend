import React from 'react'
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import "./not-found.css";
export default function NotFound() {
    return (
        <div className="not-found-page">
            <Result 
                status="404"
                title="404"
                subTitle="你好像已经到达了世界的尽头"
                extra={ <Button type="primary"><Link to="/">回到首页</Link></Button> }
            />
        </div>
    )
}
