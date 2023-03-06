import axios from "axios";
import {React,useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import Button from '../StandardComponents/JsxFiles/button'
function Saved(){ 

    const [userfound,setuserfound] = useState(0);
    const navigate=useNavigate()
    const [userArticles,setUserArticles]=useState([]);
    useEffect( () => {
      axios.get("http://localhost:5000/save",{withCredentials:true}).then((res=>{
          console.log(res.data);
          if(res.data.status==="not login"){
            setuserfound(1)
            navigate("/login");
          }
          else{
            setUserArticles(res.data.saved_articles);
            console.log(userArticles)
            setuserfound(2)
          }
      }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <div>
        {
          userfound===2?
          <div>
          <Button className = "btn_login" link = "/user"  >Home</Button>
          {userArticles.map((article) => (
            <NewsCardItem save={true} cardarticle={article}/>
          ))}
          </div>
          :
          
          <div>
             <h1>please wait</h1>
             {/* <img src="load" alt="loader"></img> */}
          </div>
  
  
        }
        
        </div>)
}

export default Saved;