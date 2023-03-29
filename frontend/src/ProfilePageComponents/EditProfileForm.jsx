import '../cssfiles/Profile/EditProfileForm.css'
import {TextField , Divider , Typography ,Button } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Random from '../png&svg/random.png'
import {useState ,useEffect} from 'react';
import axios from 'axios';

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
      }
    },
    palette: {
      primary : {
        main : "#000000",
        dark : "#ffffff",
      }
    }
  });

function EditForm(props){

    const [details , setDetails] = useState({
        FirstName : "",
        LastName  : "",
        Bio : "",
        Org : "",
        link1 : "",
        link2 : "",
        link3 : "",
        link4 : ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/user/profile/edit" , { withCredentials: true})
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.message)
        })
    })

    function handleChange(e){
        setDetails((prevItem)=>{
            return{
                ...prevItem,
                [e.target.id] : e.target.value,
            }
        })

    }

    function handleSubmit(e){
        const data = {...details};
        console.log(data);
        console.log("Hello");
        const options = {
            withCredentials: true,
            headers: { "content-type": "application/json" },
          };
        axios.post("http://localhost:5000/user/profile/edit" , data , options)
        .then((res)=>{
            console.log(res);
            if(res.data.success === true){
                console.log("Data Uploaded")
            }else{
                console.log("Fault Occured")
            }
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.message);
        })
    }

    return(
    <div className = "_outer_">
        <ThemeProvider theme={theme}>
        <div><h1>Edit Details</h1></div>
        <Divider/>
        <div className = "EditProfile__container">
        <div className = "EditProfile__Form">
        <div><TextField  onChange={handleChange} id = "FirstName" label="FirstName (max 25 chars)" variant="outlined" sx= {{width: '150%'}} inputProps={{maxLength : 25}} /></div>
        <div><TextField  onChange={handleChange} id = "LastName" label="LastName (max 25 chars)" variant="outlined" sx= {{width: '150%'}} inputProps={{maxLength : 25}} /></div>
        <div><TextField  onChange={handleChange} id = "Bio" label="Bio (max 200 chars)" variant="outlined"  sx= {{width: '150%'}} inputProps={{maxLength : 200}} multiline rows ={5}/ ></div>
        <div><TextField  onChange={handleChange} id = "Org" label="Organization" variant="outlined" sx= {{width: '150%'}}/></div>
        <div><Typography  variant = "h5">Social Links</Typography></div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} id = "link1" variant="outlined"  sx = {{width : '130%'}} InputProps={{ sx: { height: 30 } }}/></div>
        </div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} id = "link2" variant="outlined"  sx = {{width : '130%'}} InputProps={{ sx: { height: 30 } }} />   </div>   
        </div>  
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} id = "link3" variant="outlined"  sx = {{width : '130%'}} InputProps={{ sx: { height: 30 } }} />   </div>   
        </div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} id = "link4" variant="outlined"  sx = {{width : '130%'}} InputProps={{ sx: { height: 30 } }} />   </div>   
        </div>
        </div>
        <div >
        <img className= "EditProfile_image" src ={Random} alt = "NI"  />
        <input type = "file"></input>
        </div>
        
        </div>
    <Button variant = "outlined" sx= {{borderRadius : 1}} onClick = {handleSubmit} >Save Changes</Button>
    </ThemeProvider>
    </div>
    )
}

export default EditForm;