import React from 'react'
import styles from "./Pagination.module.css"

const Pagination = ({page, setPage, reposPerPage, totalRepos}) => {
  return (
    <section className={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
      
              <span>Page {page} of {Math.ceil(totalRepos/reposPerPage)}</span>
      
              <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(totalRepos/reposPerPage)}>Next</button>
    </section>
  )
}

export default Pagination