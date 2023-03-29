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
            setDetails(() => {
                return{
                    FirstName : res.data.details.FirstName,
                    LastName : res.data.details.LastName,
                    Bio : res.data.details.Bio,
                    Org : res.data.details.Org,
                    link1 : res.data.details.link1,
                    link2 : res.data.details.link2,
                    link3 : res.data.details.link3,
                    link4 : res.data.details.link4,
                }                
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    },[]);

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

    function SomeFunction(e){
        const ele = document.querySelector("#img-upload");
        console.log("Element Found");
        ele.click();
    }

    function handlePhotoChange(e){
        console.log(e.target.files);
    }

    return(
    <div className = "_outer_">
        <ThemeProvider theme={theme}>
        <div><h1>Edit Details</h1></div>
        <Divider/>
        <div className = "EditProfile__container">
        <div className = "EditProfile__Form">
        <div><TextField  onChange={handleChange} value={details.FirstName} id = "FirstName" label="FirstName (max 25 chars)" variant="outlined" sx= {{width: '180%' }} inputProps={{maxLength : 25 , style : {fontSize : "13px"}}} /></div>
        <div><TextField  onChange={handleChange} value={details.LastName} id = "LastName" label="LastName (max 25 chars)" variant="outlined" sx= {{width: '180%'}} inputProps={{maxLength : 25, style : {fontSize : "13px"} }} /></div>
        <div><TextField  onChange={handleChange} value={details.Bio} id = "Bio" label="Bio (max 200 chars)" variant="outlined"  sx= {{width: '180%'}} inputProps={{maxLength : 200 , style : {fontSize : "13px"}}} multiline rows ={5}  / ></div>
        <div><TextField  onChange={handleChange} value={details.Org} id = "Org" label="Organization(max 40 chars)" variant="outlined" sx= {{width: '180%'}} inputProps={{maxLength : 40, style : {fontSize : "13px"}}} /></div>
        <div><Typography  variant = "h5">Social Links</Typography></div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange}  value ={details.link1} id = "link1" variant="outlined"  sx = {{width : '160%'}} InputProps={{ sx: { height: 30 } }}  inputProps={{ style : {fontSize : "13px"}}} /></div>
        </div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} value ={details.link2} id = "link2" variant="outlined"  sx = {{width : '160%'}} InputProps={{ sx: { height: 30 } }}  inputProps={{ style : {fontSize : "13px"}}} />   </div>   
        </div>  
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} value ={details.link3} id = "link3" variant="outlined"  sx = {{width : '160%'}} InputProps={{ sx: { height: 30 } }} inputProps={{ style : {fontSize : "13px"}}} />   </div>   
        </div>
        <div className = "profile_socialLink"> 
        <div><AddLinkIcon sx = {{fontSize: "25px"}}></AddLinkIcon></div>
        <div><TextField   onChange={handleChange} value ={details.link4} id = "link4" variant="outlined"  sx = {{width : '160%'}} InputProps={{ sx: { height: 30 } }} inputProps={{ style : {fontSize : "13px"}}} />   </div>   
        </div>
        </div>
        <div >
        <img className= "EditProfile_image"  src ={Random} alt = "NI"  />
        <input type = "file" id = "img-upload" onChange={handlePhotoChange} ></input>
        </div>
        
        </div>
    <Button variant = "outlined" sx= {{borderRadius : 1}} onClick = {handleSubmit} >Save Changes</Button>
    <button onClick = {SomeFunction}>Sample Button </button>
    </ThemeProvider>
    </div>
    )
}

export default EditForm;