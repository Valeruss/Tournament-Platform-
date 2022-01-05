import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'

const Pages = observer(() => {
    const {tournament} = useContext(Context)
    const pageCount = Math.ceil(tournament.totalCount / tournament.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={tournament.page === page}
                    onClick={() => tournament.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
})

export default Pages