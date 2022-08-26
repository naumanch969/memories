import { Card, styled } from "@mui/material"
export const media = {
    height: '30%',
    width: '100%',
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
}

export const card = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    width: '240px',
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '430px',
        minHeight: '170px'
    },
}))

export const overlay = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
}

export const overlay2 = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
    width: '31px',
    height: '22px',
    fontSize: '30px',
}

export const cardActions = {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
}

export const cardContent = {
    margin: '4px 15px 15px 15px',
    padding: "0px"
}

export const buttonBase = {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: "column",
}

export const details = {
    display: 'flex',
    justifyContent: 'space-between',
    // margin: '20px',
    margin: '2px'
}

export const title = {
    padding: '2px 14px',
    width: '100%',
    boxSzing: 'border-box',
    textAlign: 'initial',
}

export const message = {
    padding: '2 12px',
    textAlign: "justify"
}
















//   border: {
//     border: 'solid',
//   },
//   fullHeightCard: {
//     height: '100%',
//   },
//   grid: {
//     display: 'flex',
//   },
