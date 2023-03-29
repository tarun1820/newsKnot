import '../CssFiles/button.css'
import { useNavigate } from 'react-router-dom'
import { Button} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "none",
      },
      button: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "none",
        fontSize: 20,  
      }
    },
    palette: {
      primary : {
        main : "#000000",
        dark : "#ffffff",
      }
    }
  });

function MyButton(props){
    const navigate = useNavigate();

    var classes= "button__mstyle " + props.className
    return (
        <div>
        <ThemeProvider theme={theme}>
        <Button variant = "outlined" onClick={()=>navigate(props.link)} sx={{borderRadius:2}} className= {classes}>
            {props.children}
        </Button>
        </ThemeProvider>
        </div>
    )
}

export default MyButton;