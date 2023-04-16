import * as React from "react";
import Footer from '../StandardComponents/JsxFiles/Footer'
import MyButton from '../StandardComponents/JsxFiles/button'
import Line from '../StandardComponents/JsxFiles/line'
import {Divider,Button , TextField} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles"
import '../cssfiles/Blogpage/blogForm.css'
import axios from 'axios';
import {useState} from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "none",
      },
      button: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "none",
        fontSize: 20,
      },
    },
    palette: {
      primary: {
        main: "#000000",
        dark: "#ffffff",
      },
      secondary: {
        main: "#539165",
        dark: "#539165",
      },
      tertiary:{
        main:"#537FE7",
        dark:"#537FE7"
      }
    },
  });



function BlogPage(props){

    const [open, setOpen] = useState(false);
    const [success , setSuccess] = useState(0);

      const [BlogDetails, setBlogDetails] = useState({
        blogName: "",
        AuthorName: "",
        Subject: "",
        Description: "",
        Related: "",
      });

      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };

      function handleChange(e) {
        setBlogDetails((prevItem) => {
          return {
            ...prevItem,
            [e.target.id]: e.target.value,
          };
        });
      }

    function handleSubmit(e){
        setOpen(true);
        const data = { ...BlogDetails };
        const options = {
          withCredentials: true,
        };
        console.log(data);
        if(BlogDetails.blogName.length !== 0 && BlogDetails.Subject.length !== 0 && BlogDetails.Description.length !== 0 ){
            axios
          .post("http://localhost:5000/user/blog/write", data, options)
          .then((res) => {
            console.log(res);
            if (res.data.success === true) {
              setSuccess(1);
            } else {
              setSuccess(0);
            }
          })
          .catch((err) => {
            console.log(err);
            setSuccess(0);
          });
        }else{           
            setSuccess(0);
        }
            
        
    }



    return(
        <div className = "blogpage__outer">
            <div className="">
                <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                sx={{ width: 1 }}
                >
                {success === 1 ? <Alert onClose={handleClose} severity="success">
                Blog Uploaded Successfully
                </Alert> : <Alert onClose={handleClose} severity="error">
                Fill all Required Fields
                </Alert>}
                </Snackbar>
            </div>
            
            <ThemeProvider theme={theme}>
            <div className = "blogpage__header">
            <div className="blogpage_proname">NewsKnot</div>
            <div className="blogpage_feed_btn">
            <MyButton link="/user">Feed</MyButton>
            </div>
                {/* header Proname and feed button  => Done*/}
            </div>
            <Divider flexItem/>
            <div className="blogpage_title">Upload a Blog</div>
            <div className = "blogpage__form">
                <div className = "form__field1">

                    <TextField
                    onChange={handleChange}
                    value={BlogDetails.blogName}
                    label="Blog Title"
                    required
                    variant="outlined"
                    id="blogName"
                    sx={{width : "70%"}}
                    multiline
                    rows ={2}
                    focused
                    />

                    <TextField
                    onChange={handleChange}
                    value={BlogDetails.Subject}
                    label="Abstract"
                    required
                    variant="outlined"
                    id="Subject"
                    sx={{width : "70%"}}
                    multiline
                    rows ={5}
                    focused
                    />
                </div>
                <div  className = "form__field2">
                <TextField
                onChange={handleChange}
                value={BlogDetails.Description}
                    label="Description"
                    required
                    variant="outlined"
                    id="Description"
                    sx={{width : "70%"}}
                    multiline
                    rows ={14}
                    focused
                />
                <TextField
                    onChange={handleChange}
                    value={BlogDetails.Related}
                    label="Related"
                    variant="outlined"
                    id="Related"
                    focused
                    sx={{width : "70%"}}
                    multiline
                    rows ={3}
                />
                
                <Button onClick={ ()=>{handleSubmit();}} variant="contained" color = "secondary">POST</Button>
                </div>
                {/* Create a form and Verification*/}

            </div>
            <Line/>
            <Footer/>
            </ThemeProvider>
            
        </div>
    )
}


export default BlogPage