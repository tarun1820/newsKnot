import Card from '../StandardComponents/JsxFiles/card'
import '../cssfiles/News-Page/newsCardItem.css'
import Random from '../png&svg/random.png'
import Bookmark from '../png&svg/bookmark-solid.svg'
import axios from 'axios'

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
    <div><img  className = "article__image"  alt="img" src={image===null ? Random : image}></img></div>
    <div className = "Content__container">
      <div className = "title__article"><h1>{props.cardarticle.title}</h1></div>
      <div><p className = "content__article">{content}</p></div> 
    </div>   
    <div style = {{"width" : 45}}> <img onClick={()=>click(props)} className = "bookmark__image_icon" alt= "NI"  src = {Bookmark}/> </div>
  </Card>);          
}

export default NewsCardItem 