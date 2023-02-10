import React from 'react'
import Footer from '../HomePageComponents/Footer'
import '../cssfiles/Homepage/main_page.css'
import Header from '../HomePageComponents/Header'
import Line from '../StandardComponents/JsxFiles/line'
import Description from '../HomePageComponents/description'
import Details from '../HomePageComponents/details'
import Button from '../StandardComponents/JsxFiles/button'
import axios from 'axios'
const Homestaticpage = (props) => {
    if(props.logout===true){
      axios.get("http://localhost:5000/logout",{withCredentials:true}).then((res)=>{
        console.log(res.body);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
   
  return (
    <div className = "home_page_container" >
    <Header className = "header_block">
      <div className = "proName"><h1 >NewsKnot</h1></div>
      <div className = "auth-link-btns">
      <Button className = "btn_login" link = "/login"  > Login </Button>  { /* ALready having an Account*/}
      </div>
    </Header>
    <Line/>
    <Description/>
    <Details/>
    <Line />
    <Footer className="footer_block"/>
    </div>
  )
}

export default Homestaticpage;