import { styled, Grid, Paper } from "@mui/material"


export const gridContainer = styled(Grid)(({ theme }) => ({
    maxWidth: "xl",
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column-reverse'
    }
}))



export const searchForm = styled(Paper)({
    flexDirection: "column",
    marginBottom: "2px",
    borderRadius: "12px",
    display: 'flex',
    padding: '16px',
})
export const pagination = {
    borderRadius: '12px',
    marginTop: 0,
    padding: '10px'
}
