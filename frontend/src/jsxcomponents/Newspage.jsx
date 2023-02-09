import axios from "axios";
import {React,useState,useEffect} from "react";
import Card from "./Card";
function Newspage(){
    axios.get("http://localhost:5000/user",{withCredentials:true}).then((res=>{
          console.log(res.data);
      }))
    
    
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
            console.log(res.data.articles)
            setNews(res.data.articles);
        })
        .catch((error)=>{
          console.log(error)
        })
    }


    function handleChange(name){
      console.log(name)
        setcategory(name);
    }
    useEffect(topHeadlinesArticals,[category])


    return (
      <div>
      <ul>
        <h1>select one</h1>
        <a href="/logout">logout</a>
        {/* <label name="sports" onClick={handleChange} value="sports"/> */}
        <li  onClick={()=>handleChange("sports")}>sports</li>
        <li  onClick={()=>handleChange("health")}>health</li>
        <li  onClick={()=>handleChange("entertainment")}>entertainment</li>
        <li  onClick={()=>handleChange("technology")}>technology</li>
      </ul>
        {topHeadlinesNews.map((article) => (
          <Card cardarticle={article}/>
        ))}
      </div>) 
}


export default Newspage;