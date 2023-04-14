import "../cssfiles/Homepage/description.css";

import Button from "../StandardComponents/JsxFiles/button";

function Description(props) {
  return (
    <div className="Description_box_container">
      <div className="Description_box__style">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        pulvinar facilisis lobortis. Sed imperdiet eros sit amet tellus luctus,
        eget
      </div>
      <div>
        <Button link="/signup" className="Description_box__button">
          Getting Started
        </Button>
      </div>
    </div>
  );
}

export default Description;
