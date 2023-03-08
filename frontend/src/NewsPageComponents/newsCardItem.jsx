import Card from '../StandardComponents/JsxFiles/card'
import '../cssfiles/News-Page/newsCardItem.css'
import Random from '../png&svg/random.png'
import Bookmark from '../png&svg/bookmark-solid.svg'
import axios from 'axios'
import {useState , useEffect} from 'react';
import {heart} from 'react-icons-kit/fa/heart'
import {basic_heart} from 'react-icons-kit/linea/basic_heart'
import { Icon } from 'react-icons-kit'




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

  const [reactions,setReactions] = useState(0);


  useEffect(() => {
    const fetchReactions = async () => {
    try{
    axios.get(`http://localhost:5000/user/${Title}`,{withCredentials:true}).then((res)=>{      
      if(res.data.success===true){
        setReactions(() => {
          return res.data.likes ;
        });
      }else{
        if( res.data.error_id===0){
          setReactions(() => {
            return 0 ;
          });
        }
      }     
    }).catch(()=>{});
  }catch(err){}
  };
  fetchReactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);




  function  likeHandler(e){
    let data = {
      title : Title,
    }
    let a = 0;
    const options = {
      withCredentials:true,
      headers: {"content-type": "application/json"},
    }
    axios.post(`http://localhost:5000/user/${Title}`, data , options).then((res) =>{
      console.log(res)
      a = res.data.likes; 
      setReactions(a);  
      console.log(a);
      
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
        <div><Icon icon={basic_heart} size={25}  className = "article_reaction_icon" onClick = {likeHandler}/></div>
        <div><label className = "article_reaction_label">{reactions}</label></div>
      </div>
    </div>
  </Card>);          
}

export default NewsCardItem 