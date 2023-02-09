import Discord from '../png&svg/discord.png'
import Whatsapp from '../png&svg/whatsapp.png'
import Telegram from '../png&svg/telegram.png'
import Twitter from '../png&svg/twitter.png'
import '../cssfiles/Homepage/footer.css'

function Footer(){
    return(
        <div className="footer_container">
            <div><img src={Telegram} alt="nI" className="footer_icon telegram" /></div>
            <div><img src={Whatsapp} alt="nI" className="footer_icon whatsapp" /></div>
            <div><img src={Discord} alt="nI"  className="footer_icon discord" /></div>
            <div><img src={Twitter} alt="nI"  className="footer_icon twitter" /></div>
        </div>
    );
};


export default Footer;