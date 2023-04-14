import "../CssFiles/button.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: "none",
    },
    button: {
      textTransform: "none",
      fontSize: 20,
    },
  },
});

function MyButton(props) {
  const navigate = useNavigate();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Poppins",
            borderRadius: 2,
            width: 200,
            py: 1,
            fontWeight: "bold",
          }}
          onClick={() => navigate(props.link)}
          disableElevation
        >
          {props.children}
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default MyButton;
