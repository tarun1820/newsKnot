import axios from "axios";
import {React,useState,useEffect} from "react";
import NewsCardItem from "../NewsPageComponents/newsCardItem";
import '../cssfiles/News-Page/main_page.css'
import {useNavigate} from 'react-router-dom'
import Button from '../StandardComponents/JsxFiles/button'
import Line from '../StandardComponents/JsxFiles/line'


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className = "navbar_newspage_header"> 
      <div className = "proName_newspage">NewsKnot</div>  
      <div className = "navbar_newspage_btns">
      <div><Button className = "navbar_newspage_btn" link = "/saved"  > Saved</Button></div>
      <div><Button className = "navbar_newspage_btn" link = "/logout"> Logout </Button></div>
      </div>
      </div>
      
        <div className = "navbar_newspage">
        <div className = "navbar_newspage_item" onClick={()=>handleChange("sports")}>Sports</div>
        <div  className = "navbar_newspage_item" onClick={()=>handleChange("health")}>Health</div>
        <div  className = "navbar_newspage_item" onClick={()=>handleChange("entertainment")}>Entertainment</div>
        <div  className = "navbar_newspage_item" onClick={()=>handleChange("technology")}>Technology</div>
        
        </div>
        <Line className = "newspage_line"/>
        {
               
        topHeadlinesNews.map((article) => (
          <NewsCardItem save={false} cardarticle={article} likes = {0} dislikes = {0}/>
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