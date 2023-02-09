const outerCard = {
  backgroundColor:"yellow",
  // display:"inline";
}


function Card(props){
   return(<span style={outerCard} >
    <img height={250} width={350} alt="imag" src={props.cardarticle.urlToImage}></img>
    <p>{props.cardarticle.source.name}</p>
    <p>{props.cardarticle.title}</p>
  </span>);
          
}

export default Card 