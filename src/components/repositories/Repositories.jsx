import React from 'react'
import styles from "./Repositories.module.css" ;

const Repositories = ({repos, page, setPage, reposPerPage}) => {
  return (
    <>
      <h3 className={styles.repoHeading}>Repositories</h3>

      {/* Repository List */}
      <ul className={styles.repoList}>
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id} className={styles.repoCard}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoName}
              >
                {repo.name}
              </a>
              <p className={styles.repoDesc}>
                {repo.description  // Display Description with length 80-100 characters
                  ? repo.description.length > 100
                    ? `${repo.description.substring(0, 80)}...`
                    : repo.description
                  : "No description available"}
              </p>
              <p className={styles.repoStats}>
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </p>
            </li>
          ))
        ) : (
          ""
        )}
      </ul>
    </>
  )
}

export default Repositories