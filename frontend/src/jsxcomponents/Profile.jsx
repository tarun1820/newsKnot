import Line from '../StandardComponents/JsxFiles/line'
import Button from '../StandardComponents/JsxFiles/button'
import Footer from '../StandardComponents/JsxFiles/Footer'
import '../cssfiles/Profile/mainPageProfile.css'



function Profile(props){
    return(
        <div>
            <div className = "profilepage_header">
                <div className = "profilepage_proname">NewsKnot</div>
                {/* Should change routes */}
                <div className = "profilepage_feed_btn"><Button link = "./saved">Feed</Button></div>                
            </div>
            <Line/>
            <Footer />



        </div>
    )
}

export default Profile;