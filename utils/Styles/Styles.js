import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    navbar:{
        backgroundColor:"#203040",
        '& a':{
            color:"#ffffff"
        }
    },
    navbarsItems:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    },
    main:{
        minHeight:'80vh'
    },
    footer:{
        textAlign:"center"
    },
  

})

export default useStyles
