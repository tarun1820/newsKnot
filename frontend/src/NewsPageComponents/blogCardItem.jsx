import * as React from 'react';
import Card from "../StandardComponents/JsxFiles/card";
import Divider from "@mui/material/Divider";


function BlogCardItem(props){

    let blog = props.blogData
    return(
        <div>
            <Card className="new_article__styles">
                <div>{blog.AuthorName}</div>
                <div>{blog.Subject}</div>
                <Divider flexItem/>
                <div>{blog.Description}</div>
                <div>{blog.Related}</div>
            </Card>
        </div>
    )
}


export default BlogCardItem