import Card from '../StandardComponents/JsxFiles/card'
import '../cssfiles/News-Page/newsCardItem.css'
import Random from '../png&svg/random.png'
import Bookmark from '../png&svg/bookmark-solid.svg'
import axios from 'axios'
import Like from '../png&svg/thumbs-up-solid.svg'
import DisLike from '../png&svg/thumbs-down-solid.svg'

function click(newsArticle){
  axios.post('http://localhost:5000/save',newsArticle,{withCredentials:true}).then((res)=>{
    console.log(res.body);
  })
  .catch((err)=>{
    console.log(err);
  })
}

function NewsCardItem(props){
  var content = props.cardarticle.content
  var image = props.cardarticle.urlToImage 
  // console.log(image) 
  // console.log(content)
   return(<Card className = "new_article__styles" >
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
        <div><img className = "article_reaction_icon" alt = "img" src = {Like} /></div>
        <div><label className = "article_reaction_label">{props.likes}</label></div>
      </div>
      <div className = "article_reaction">
        <div><img className = "article_reaction_icon" alt = "img" src = {DisLike} /></div>     
        <div><label className = "article_reaction_label">{props.dislikes}</label></div>
      </div>
    </div>
  </Card>);          
}

export default NewsCardItem 