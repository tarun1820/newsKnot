import "../cssfiles/Profile/ProfileDetails.css";
import Typography from "@mui/joy/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../StandardComponents/JsxFiles/button";
import { useNavigate } from "react-router-dom";


function ProfileDetails(props) {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    FirstName: "",
    LastName: "",
    Bio: "",
    Org: "",
    link1: "",
    link2: "",
    link3: "",
    link4: "",
    photo: "",
  });

  // function onClickHandler(){
  //     axios.get(url).then(res => {
  //         console.log(res)
  //     }).catch(err => {
  //         console.log("hello");
  //         console.log(err);
  //     });
  // }

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", { withCredentials: true })
      .then((res) => {
        setDetails(() => {
          return {
            FirstName: res.data.details.FirstName,
            LastName: res.data.details.LastName,
            Bio: res.data.details.Bio,
            Org: res.data.details.Org,
            link1: res.data.details.link1,
            link2: res.data.details.link2,
            link3: res.data.details.link3,
            link4: res.data.details.link4,
            photo: res.data.details.photo,
          };
        });
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="profile_details_container">
        <div className="profile_details_photo">
          <img className="profile_details_photo_img" src={`http://localhost:5000/uploads/${details.photo}`} alt="NI" />
        </div>
        <div className="profile_details_user">
          <Typography level="h4" sx={{color: "blue"}}>{details.FirstName + " " + details.LastName}</Typography>
          <Typography level="p">{details.Org}</Typography>
          {details.Bio === "" ? "" : <Typography level="p">{details.Bio}</Typography>}
          {details.link1 === "" ? "" : <Typography level="p">{details.link1}</Typography>}
          {details.link2 === "" ? "" : <Typography level="p">{details.link2}</Typography>}
          {details.link3 === "" ? "" : <Typography level="p">{details.link3}</Typography>}
          {details.link4 === "" ? "" : <Typography level="p">{details.link4}</Typography>}
        </div>
        <div>
          <Button link="/user/profile/edit">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
