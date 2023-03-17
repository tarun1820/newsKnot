import '../cssfiles/Profile/ProfileDetails.css'
import Random from '../png&svg/random.png'
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {useState , useEffect} from 'react';
import axios from 'axios'
import Button from '../StandardComponents/JsxFiles/button'; 

const url = 'http://localhost:5000/user/profile';


function addDetailsHandler(){
    console.log("Hello");
}


function ProfileDetails(props){  

    const [details , setDetails] = useState({
        username : "",
        email : ""
    });

    // function onClickHandler(){
    //     axios.get(url).then(res => {
    //         console.log(res)
    //     }).catch(err => {
    //         console.log("hello");
    //         console.log(err);
    //     });
    // }

    useEffect(() =>{
        axios.get(url,{ withCredentials: true }).then(res => {
            setDetails(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])



    return(
        <div>
            <div className = "profile_details_container">
            <div className= "profile_details_photo">
                <img className= "profile_details_photo_img" src ={Random} alt = "NI"  />
            </div>
            <div className = "profile_details_user">
                <Typography level = "h2">{details.username}</Typography>
                <Typography level = "p">{details.email}</Typography>
            </div>
            <div onClick = {addDetailsHandler}>
            <Button>Add Details</Button>
            </div>
            </div>
        </div>
    )
}

export default ProfileDetails