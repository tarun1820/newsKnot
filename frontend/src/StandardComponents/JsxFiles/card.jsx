import '../CssFiles/card.css'


function Card(props){
    var classes = "card__styles " + props.className 
    return(
        <div className = {classes}>{props.children}</div>

    );
};

export default Card