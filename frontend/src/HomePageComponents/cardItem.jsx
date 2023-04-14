import "../cssfiles/Homepage/cardItem.css";
import Card from "../StandardComponents/JsxFiles/card";
import Image from "../png&svg/random.png";

function CardItem(props) {
  // write code for selecting an image according to ID
  //if(id===1 ){
  //     send Image 1
  // }

  return (
    <Card className="cardItem__style">
      <div className="cardImage__style">
        <img src={Image} alt="NI" />
      </div>
      <div className="cardText_style">
        <h1 className="cardHeading">{props.cardHeading}</h1>
        <p className="cardPara">{props.cardText}</p>
      </div>
    </Card>
  );
}

export default CardItem;
