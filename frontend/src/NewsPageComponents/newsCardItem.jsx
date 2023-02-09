import Card from '../StandardComponents/JsxFiles/card'
import '../cssfiles/News-Page/newsCardItem.css'


function NewsCardItem(props){
   return(<Card styles = "new_article__styles" >
    <div><img height={250} width={350} alt="imag" src={props.cardarticle.urlToImage}></img></div>
    <div><p>{props.cardarticle.title}</p></div>    
  </Card>);          
}

export default NewsCardItem 