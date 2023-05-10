import Line from "../StandardComponents/JsxFiles/line";
import Button from "../StandardComponents/JsxFiles/button";
import Footer from "../StandardComponents/JsxFiles/Footer";
import "../cssfiles/Profile/mainPageProfile.css";
import UserArticlesSavedAndLiked from "../ProfilePageComponents/Articles(L&F)";
import ProfileDetails from "../ProfilePageComponents/ProfileDetails";
import Divider from "@mui/material/Divider";

function Profile(props) {
  return (
    <div>
      <div className="profilepage_header">
        <div className="profilepage_proname">NewsKnot</div>
        <div className="profilepage_feed_btn">
          <Button link="/user">Feed</Button>
        </div>
      </div>
      <div className="profilepage_body">
        <div className="profilepage_details">
          <ProfileDetails />
        </div>
        <Divider orientation="vertical" flexItem></Divider>
        <div className="profilepage_articles">
          <UserArticlesSavedAndLiked />
        </div>
      </div>
      <Line />
      <Footer />
    </div>
  );
}

export default Profile;
