import '../CssFiles/button.css'
import { useNavigate } from 'react-router-dom'
import Arrow from '../pngs/arrow.svg'

// function addCSS(){ 
//     var btnElement = document.getElementsByClassName("Description_box__button");
//     var imgElement = document.getElementsByClassName("button_transition_logo");
//     var btn_classList = btnElement[0].classList;
//     var img_classList = imgElement[0].classList;
//     btn_classList.add("Description_box__button__hover")
//     img_classList.add("button_transition_logo__hover")
//     console.log(btn_classList)
// }

//  function removeCSS(){ // should use states
//     var btnElement = document.getElementsByClassName("Description_box__button");
//     var imgElement = document.getElementsByClassName("button_transition_logo");
//     var btn_classList = btnElement[0].classList;
//     var img_classList = imgElement[0].classList;
//     btn_classList.remove("Description_box__button__hover")
//     img_classList.remove("button_transition_logo__hover")  
//  }



function Button(props){
    const navigate = useNavigate();

    var classes= "button__mstyle " + props.className
    return (
        <div>
        <button onClick={()=>navigate(props.link)} className= {classes}>
            {props.children}
        </button>
        </div>
    )
}

export default Button;