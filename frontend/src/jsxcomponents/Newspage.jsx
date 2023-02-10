import axios from "axios";
import {React,useState,useEffect} from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import '../cssfiles/News-Page/main_page.css'
import {useNavigate} from 'react-router-dom'

function Newspage(){
  const [userfound,setuserfound] = useState(0);
    const navigate=useNavigate()
    
    useEffect( () => {
      axios.get("http://localhost:5000/user",{withCredentials:true}).then((res=>{
          console.log(res.data);
          if(res.data.status==="not login"){
            setuserfound(1)
            navigate("/login");
          }
          else{
            setuserfound(2)
          }
      }))
    },[]);

    
    
    const [category,setcategory] = useState(null);

    const [topHeadlinesNews,setNews] = useState([]);

    // if(!userData){
    //     return null;
    // }
    function topHeadlinesArticals(){
        const data = JSON.stringify({category});
        const options = {
          withCredentials:true,
          headers: {"content-type": "application/json"},
        }
        //axios post reqest for news data from backend server 5000
        axios.post("http://localhost:5000/user", data, options,)
        .then((res)=>{
            // console.log(res.data.articles)
            setNews(res.data.articles);
        })
        .catch((error)=>{
          console.log(error)
        })
    }


    function handleChange(name){
      // console.log(name)
        setcategory(name);
    }
    useEffect(topHeadlinesArticals,[category])


    return (
      <div>
      {
        userfound===2?
        <div>
        <ul>
        <h1>select one</h1>
        <a href="/logout">logout</a>
        <li  onClick={()=>handleChange("sports")}>sports</li>
        <li  onClick={()=>handleChange("health")}>health</li>
        <li  onClick={()=>handleChange("entertainment")}>entertainment</li>
        <li  onClick={()=>handleChange("technology")}>technology</li>
        </ul>
        {topHeadlinesNews.map((article) => (
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


export default Newspage;