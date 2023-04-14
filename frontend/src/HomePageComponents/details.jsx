import CardItem from "../HomePageComponents/cardItem";
import "../cssfiles/Homepage/details.css";
var iter = 1;

function Details(props) {
  const details = [
    {
      id: iter++,
      cardHeading: "Lorem ipsum dolor sit amet",
      cardText:
        "quam elit dapibus massa. Nam ex neque, tincidunt a consectetur at, pretium non metus. Ut vestibulum dui ut blandit facilisis. Nunc tempor aliquet enim vitae mollis. Duis in ipsum congue, congue massa id, feugiat ex. Aliquam semper, augue vel faucibus blandit, leo odio",
    },
    {
      id: iter++,
      cardHeading: "Lorem ipsum dolor sit amet",
      cardText:
        "quam elit dapibus massa. Nam ex neque, tincidunt a consectetur at, pretium non metus. Ut vestibulum dui ut blandit facilisis. Nunc tempor aliquet enim vitae mollis. Duis in ipsum congue, congue massa id, feugiat ex. Aliquam semper, augue vel faucibus blandit, leo odio",
    },
    {
      id: iter++,
      cardHeading: "Lorem ipsum dolor sit amet",
      cardText:
        "quam elit dapibus massa. Nam ex neque, tincidunt a consectetur at, pretium non metus. Ut vestibulum dui ut blandit facilisis. Nunc tempor aliquet enim vitae mollis. Duis in ipsum congue, congue massa id, feugiat ex. Aliquam semper, augue vel faucibus blandit, leo odio",
    },
  ];

  return (
    <div className="details__container">
      {details.map((x) => (
        <CardItem
          cardID={x.id}
          cardHeading={x.cardHeading}
          cardText={x.cardText}
        ></CardItem>
      ))}
    </div>
  );
}

export default Details;
