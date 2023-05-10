import Footer from '../StandardComponents/JsxFiles/Footer'
import Divider from "@mui/material/Divider";
import {useEffect , useState} from 'react';
import Button from "../StandardComponents/JsxFiles/button";
import BlogCardItem from '../BlogpageComponents/blogCardItem'
import '../cssfiles/Blogpage/allblogs.css'
import axios from 'axios'
import CircularProgress from "@mui/material/CircularProgress";


function AllBlogs(props){
    const [blogs,setBlogs] = useState([]);
    const options = {
        withCredentials: true,
        headers: { "content-type": "application/json" },
      };

    useEffect(()=>{
        axios.get('http://localhost:5000/user/blog/user_blogs' , options)
        .then((res)=>{
            console.log(res)
            setBlogs(res.data.data);
        }).catch(err => {
            console.log(err.message)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <div>
            <div className="allblogspage_header">
                <div className="allblogspage_proname">NewsKnot</div>
                <div className="allblogspage_feed_btn">
                <Button link="/user">Feed</Button>
                </div>
            </div>
            <Divider/>
            <div className="Blogs"></div>
            <div>            
            {blogs.map((article) => {
            return (
            <BlogCardItem
                key={article._id}
                blogarticle={article}                
            />
            );
            })}                
            </div>
            
            <Footer/>
        </div>
    )
}

export default AllBlogs;