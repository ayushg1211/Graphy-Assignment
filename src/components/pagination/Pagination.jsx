import React from 'react'
import styles from "./Pagination.module.css"

const Pagination = ({page, setPage, length, reposPerPage}) => {
  return (
    <section className={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
      
              <span>Page {page}</span>
      
              <button onClick={() => setPage(page + 1)} disabled={length < reposPerPage}>Next</button>
    </section>
  )
}

export default Pagination