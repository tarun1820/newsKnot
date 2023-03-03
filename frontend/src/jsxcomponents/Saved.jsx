import axios from "axios";
import {React,useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import NewsCardItem from "../NewsPageComponents/newsCardItem";
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
    },[]);
    
    return (
        <div>
        {
          userfound===2?
          <div>
          {userArticles.map((article) => (
            <NewsCardItem cardarticle={article}/>
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