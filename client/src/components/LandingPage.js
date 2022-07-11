import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { NavLink ,useHistory} from "react-router-dom";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import 'bootstrap';


const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])





    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        console.log(video)

        return (
            
        <Col lg={6} md={8} xs={24}>
            <div className="sidevideo" style={{padding:'10px'}}>
            <NavLink style={{textDecoration: 'none'}} to={`/video/${video._id}`}>
            <div  style={{ position: 'relative' }}>
            
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                
            </div><br />
            <div style={{display:'flex'}}>
            <Meta
                avatar={
                    <img src={`/upload/${video.writer.picture}`} style={{height:'70px',width:'70px'}}/>
                }
                
                
            />
            <div>
            <h5 style={{color:'white'}}>{video.title} </h5><br />
            <span style={{color:'white'}}>{video.writer.name} </span><br />
            <span style={{color:'white'}}> {video.views} views</span>
             <span style={{color:'white',marginLeft:'40px'}}> {moment(video.createdAt).format("MMM Do YY")} </span>
             </div>
            </div>
            </NavLink>
            </div>
        </Col>
        
        )
    })



    return (
        <div style={{background:'#151b1d',backgroundSize:'cover',height:'1200px',position:'relative'}}>
        <div style={{ width: '85%',marginLeft:'auto',marginRight:'auto'}}>
            <Title level={2} style={{color:'white'}}> All Videos </Title>
            <hr style={{color:'white'}}/>
            <Row>
            
                {renderCards}
            
                </Row>
        </div>
        </div>
    )
}

export default LandingPage