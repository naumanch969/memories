import { deepPurple } from "@mui/material/colors"
import { styled, Paper, Avatar, Grid, Typography, Box } from "@mui/material"

export const commentsOuterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "49vw",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column-reverse',
        width: "100%"
    }
}))

export const commentHeading = styled(Typography)(({ theme }) => ({
    width: "45vw",
    [theme.breakpoints.down("sm")]: {
        marginBottom: '4px',
        fontWeight: '400'
    }
}))

export const recommendedPosts = styled(Grid)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}))

export const card = styled(Paper)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    borderRadius: "15px",
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        flexDirection: 'column-reverse',
        boxSizing: 'border-box',
        margin: '0',
        padding: '20px',
    },
}))

export const commentsInnerContainer = styled(Box)(({ theme }) => ({
    height: "200px",
    overflowY: "auto",
    width: "47vw",
    marginRight: "30px",
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0px',
        height: '35vh',
    }
}))

export const commentBlock = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '38vw',
    right: '53px',
    marginTop: '22px',
    [theme.breakpoints.down("sm")]: {
        position: 'static',
        width: '100%',
        marginBottom: '12px',
        marginTop: '0px',
    }
}))

export const imageSection = styled("div")(({ theme }) => ({
    margin: '20px',
    height: '48%',
    width: '40vw',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0px',
        boxSizing: 'border-box',
        paddingBottom: '6px',
    },
}))

export const commentText = styled("p")(({ theme }) => ({
    margin: 0,
    paddingLeft: "14px",
    [theme.breakpoints.down('sm')]: {
        paddingLeft: "6px",
    },
}))

export const purple = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: '45px',
    height: '45px'
}))

export const section = styled(Box)(({ theme }) => ({
    borderRadius: '20px',
    margin: '20px',
    width: '100%',
    flex: 1,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        margin: '0px',
    }
}))

export const recommendedPostsSection = {
    borderRadius: '20px',
    margin: '20px 0',
    width: '100%',
    flex: 1,
}

export const typography = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '230px'
}

export const img = {
    height: '42vh',
    width: '100%',
    borderRadius: '20px',
    border: '1px solid',
}

export const loadingPaper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
}






export const listOfComments = {
    display: 'flex',
    gap: '20px',
    marginBottom: "10px"
}





