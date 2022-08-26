import { styled, Paper, Avatar, Button } from "@mui/material"

export const paper = styled(Paper) ( ({theme})=>({
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
}) )

export const root = styled("div") ( ({theme})=>({
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
}) )

export const avatar = styled(Avatar) ( ({theme})=>({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}) )

export const form = styled("form") ( ({theme})=>({
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
}) ) 

export const submit = styled(Button) ( ({theme})=>({
    margin: theme.spacing(3, 0, 2),
}) ) 

export const googleButton = styled(Button) ( ({theme})=>({
    marginBottom: theme.spacing(2),
}) ) 
