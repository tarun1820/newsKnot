import '../cssfiles/Homepage/header.css'

function Header(props){
    return (
        <div className= "header_container">
            {props.children}
        </div>
    )
};

export default Header;