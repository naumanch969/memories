import { deepPurple } from "@mui/material/colors"
import { styled, AppBar, Toolbar, Avatar } from "@mui/material"

export const appbar = styled(AppBar)(({ theme }) => ({
    borderRadius: 15,
    display: 'flex',
    height: "75px",
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '10px 0 18px 0',
    alignItems: 'center',
    padding: '10px 40px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        margin: '10px 0',
        padding: '10px 12px',
        height: 'auto',
    },
}))

export const textLogo = styled("img")(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        height: "4vh"
    }
}))

export const imgLogo = styled("img")(({ theme }) => ({
    marginLeft: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
        height: "4vh"
    }
}))



export const heading = styled("h1")(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
}))

export const toolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '350px',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
    },
}))

export const profile = styled("div")(({ theme }) => ({
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
        marginTop: 20,
        justifyContent: 'center',
    },
}))

export const logout = {
    marginLeft: '20px',
}

export const userName = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    width: 'auto',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontFamily: 'cursive',
    fontSize: '24px',
    margin: 0,
}

export const brandContainer = {
    display: 'flex',
    alignItems: 'center',
}

export const purple = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
}))





