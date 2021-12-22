import { createMuiTheme } from "@material-ui/core";
import { useContext } from "react";
import { Store } from "../Store";





 const {state,dispatch} = useContext(Store);
 const {darkMode} = state;

const theme = createMuiTheme({
typography:{
   h1:{
       fontSize:'1.6rem',
       fontWeight:400,
       margin:'1rem 0',
   },
   h2:{
       fontSize:'1.4rem',
       fontWeight:400,
       margin:'1rem 0'
   } ,
   body1:{
       fontWeight:'normal'
   }
},
palette:{
    type:"light",
    primary:{
        main:'#f0c000'
    },
    secondary:{
        main:'#208080'
    }
}

})

export default theme