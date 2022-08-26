import React, { useEffect } from "react"
import { PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import * as styled from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../actions/posts"

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [page, dispatch])

    return (
        <styled.pagination
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )

}

export default Paginate