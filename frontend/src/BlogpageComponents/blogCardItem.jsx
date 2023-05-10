import { React } from "react";
import axios from 'axios';
import '../cssfiles/Blogpage/blogCardItem.css'
import {useEffect , useState} from 'react';
import ArrowDown from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";

function BlogCardItem(props){
    const author = props.blogarticle.AuthorName;
    const photo = props.blogarticle.photo;
    const title = props.blogarticle.blogName;
    const subject = props.blogarticle.Subject;
    const des = props.blogarticle.Description;
    const time = props.blogarticle.UploadedTime;
    const rel = props.blogarticle.Related;  
    const [transform, setTransform] = useState([-90, 0]);
    console.log(photo);
    

    const divStyles = {
        transform: `translate(${0}px, ${transform[0]}px)`,
        opacity: transform[1],
        background: "#ECF2FF",
        borderRadius: "10px",
      };

    
    return(
        <div>
        <div className = "blogCard" onMouseOut={() => setTransform([-90, 0])}
            onMouseOver={() => setTransform([-10, 1])}>
        <div className = "blogCard_info">
            {/* <img src={`http://localhost:5000/uploads/${photo}`} alt="NI"/> */}
            <div className = "AuthorName"> {author}</div>
        </div>
        <div className = "blogCard_title">
            {title}
        </div>
        <div className = "blogCard_subject">
            {subject}
        </div>      
        
    </div>
    <div
        className="Blog_bottom"
        style={divStyles}
        onMouseOut={() => setTransform([-90, 0])}
        onMouseOver={() => setTransform([-10, 1])}
      >
        <div className="article_viewmore">
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="View more"
            arrow
          >
            <IconButton
            //   onClick={() => {
            //     setClickArticle(true);
            //   }}
            >
              <ArrowDown sx={{ color: "black", fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
    ) 

}

export default BlogCardItem;