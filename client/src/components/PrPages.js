import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'

const PrPages = observer(() => {
    const {user} = useContext(Context)
    const pageCount = Math.ceil(user.totalCount / user.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={user.page === page}
                    onClick={() => user.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
})

export default PrPages