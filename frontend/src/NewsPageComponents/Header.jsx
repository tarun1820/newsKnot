import { React} from "react";
import "../cssfiles/News-Page/header.css";
import { useNavigate } from "react-router-dom";
import MyButton from "../StandardComponents/JsxFiles/button";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Header(props) {
const navigate = useNavigate();
  return (
    <>
    {[false].map((expand) => (
    <Navbar collapseOnSelect expand="lg" className = "newspage_header_container">
        
        <div className = "proName_newspage">
        NewsKnot
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Options
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
        
        <div className="newspage_links">
          <Nav >
            <Nav.Link ><Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="View Profile"
                  arrow
                >
                  <Button onClick={() => navigate("/user/profile")}>
                    <img
                      className="profile_image"
                      src={`http://localhost:5000/uploads/${props.photo}`}
                      alt="NI"
                    />
                    <p className="newspage_username">{props.user}</p>
                  </Button>
                </Tooltip></Nav.Link>
            <Nav.Link >
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="Write A Blog"
                  arrow
                >
                  <IconButton onClick={() => navigate("/user/blog/createBlog")}>
                    <AddCircleIcon sx={{ color: "gold", fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
            </Nav.Link>
            <Nav.Link ><div className= "navbar_newspage_btn"><MyButton link ="/user/blog/AllBlogs">View Blogs</MyButton></div></Nav.Link>
            <Nav.Link ><div className= "navbar_newspage_btn"><MyButton link="/logout"> Logout </MyButton></div></Nav.Link>
          </Nav>
          </div>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
        
    </Navbar>
    ))};
    </>
  );
}

export default Header;