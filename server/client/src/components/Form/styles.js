import { Paper, styled } from "@mui/material"

export const form = styled("form")(({ theme }) => ({
      borderRadius: '12px',
      marginBottom: '2px',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& .MuiTextField-root': {
            margin: theme.spacing(1),
      }
}))

export const paper = styled(Paper)(({ theme }) => ({
      borderRadius: '12px',
      marginBottom: '2px',
      display: 'flex',
      padding: theme.spacing(2),
}))

export const submitButton = {
      marginBottom: "6px"
}

export const box = {
      width: '97%',
      margin: '10px 0',
}

export const textField = {
      marginBottom: '6px',
}
