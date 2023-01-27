import Discord from '../png&svg/discord.svg'
import Whatsapp from '../png&svg/whatsapp.svg'
import Telegram from '../png&svg/telegram-plane.svg'
import Twitter from '../png&svg/Twitter.svg'


function Footer(){
    return(
        <div className="footer_container">
            <img src={Telegram} alt="nI" className="footer_icon" />
            <img src={Whatsapp} alt="nI" className="footer_icon" />
            <img src={Discord} alt="nI"  className="footer_icon" />
            <img src={Twitter} alt="nI"  className="footer_icon" />
        </div>
    );
};


export default Footer;