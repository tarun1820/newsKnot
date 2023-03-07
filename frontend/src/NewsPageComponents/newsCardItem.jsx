import Card from '../StandardComponents/JsxFiles/card'
import '../cssfiles/News-Page/newsCardItem.css'
import Random from '../png&svg/random.png'
import Bookmark from '../png&svg/bookmark-solid.svg'
import axios from 'axios'
import Like from '../png&svg/thumbs-up-solid.svg'
import DisLike from '../png&svg/thumbs-down-solid.svg'
import {useState , useEffect} from 'react';




function click(newsArticle){
  axios.post('http://localhost:5000/save',newsArticle,{withCredentials:true}).then((res)=>{
    console.log(res.body);
  })
  .catch((err)=>{
    console.log(err);
  })
}



function NewsCardItem(props){

  // useEffect(fetchReactions,[]);
  var content = props.cardarticle.content
  var image = props.cardarticle.urlToImage 
  let Title = props.cardarticle.title

  const [reactions,setReactions] = useState([0,0]);


  useEffect(() => {
    const fetchReactions = async () => {
    try{
    axios.get(`http://localhost:5000/user/${Title}`,{withCredentials:true}).then((res)=>{      
      if(res.data.success===true){
        setReactions(() => {
          return [res.data.likes , res.data.dislikes ] ;
        });
      }else{
        if( res.data.error_id===0){
          setReactions(() => {
            return [0 , 0] ;
          });
        }
      }     
    }).catch((err)=>{
      console.log(err.message);
    })
  }catch(err){
    console.log(err.message);
  }
  };
  fetchReactions();
  },[]);




  function  increaseLike(e){
    let data = {
      title : Title,
      likes : reactions[0]+1,
      dislikes : reactions[1]
    }
    setReactions((prev) => {
      return [reactions[0]+1,reactions[1]];
    });    
    
    const options = {
      withCredentials:true,
      headers: {"content-type": "application/json"},
    }
    console.log("Hello");
    axios.post(`http://localhost:5000/user/${Title}`, data , options).then((res) =>{
      console.log(res)
    }).catch((err) => {
      console.log(err.message);
    });
  }



  

  function increaseDisLike(e){
    let data = {
      title : Title,
      likes : reactions[0],
      dislikes : reactions[1]+1
    }
    setReactions((prev) =>{
      return [prev[0],prev[1]+1]
    });
    
    const options = {
      withCredentials:true,
      headers: {"content-type": "application/json"},
    }
    axios.post(`http://localhost:5000/user/${Title}`, data , options).then((res) =>{
      console.log(res)
    }).catch((err) => {
      console.log(err.message);
    });
  }




   return(<Card className = "new_article__styles"  >
    <div className = "article__container">
    <div><img  className = "article__image"  alt="img" src={image===null ? Random : image}></img></div>
    <div className = "Content__container">
      <div className = "title__article"><h1>{props.cardarticle.title}</h1></div>
      <div><p className = "content__article">{content}</p></div> 
    </div> 
    {props.save===false? 
    <div style = {{"width" : 45}}> <img onClick={()=>click(props)} className = "bookmark__image_icon" alt= "NI"  src = {Bookmark}/> </div>:
    <div></div>
    }
    </div>
    <div className= "article_reactions">      
      <div className = "article_reaction">
        <div><img className = "article_reaction_icon" alt = "img" src = {Like}  onClick = {increaseLike}/></div>
        <div><label className = "article_reaction_label">{reactions[0]}</label></div>
      </div>
      <div className = "article_reaction">
        <div><img className = "article_reaction_icon" alt = "img" src = {DisLike} onClick = {increaseDisLike} /></div>     
        <div><label className = "article_reaction_label">{reactions[1]}</label></div>
      </div>
    </div>
  </Card>);          
}

export default NewsCardItem 