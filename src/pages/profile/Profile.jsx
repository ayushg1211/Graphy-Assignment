import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const { uname: username } = useParams(); // Getting the username from URL
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reposPerPage, setReposPerPage] = useState(10) ;
  const [page, setPage] = useState(1) ;

  useEffect(() => {
    async function fetchData() {
      console.log(username);
      try {
        setLoading(true);
        setError("");

        // Fetching the user details
        const userResponse = await Axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(userResponse.data);

        // Fetching the public repos of the user
        const reposResponse = await Axios.get(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerPage}`
        );
        setRepos(reposResponse.data);
      } catch (err) {
        setError("User not found or API rate limit exceeded.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username, page]);

  if (error) return <p className={styles.error}>{error}</p>;



  return (
    <section className={styles.profileContainer}>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        user && (
          <div className={styles.profileCard}>
            <img
              src={user.avatar_url}
              alt={user.login}
              className={styles.avatar}
            />
            <h2 className={styles.username}>{user.name || user.login}</h2>
            <p className={styles.bio}>{user.bio}</p>
            <p className={styles.stats}>
              <strong>Followers:</strong> {user.followers} |{" "}
              <strong>Repos:</strong> {user.public_repos}
            </p>
          </div>
        )
      )}

      <h3 className={styles.repoHeading}>Repositories</h3>
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
                {repo.description
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
          <p className={styles.noRepo}>No repositories found.</p>
        )}
      </ul>

      {
        repos?.length < reposPerPage && page < 2 ? "":
      
            <section className={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
      
              <span>Page {page}</span>
      
              <button onClick={() => setPage(page + 1)} disabled={repos.length < reposPerPage}>Next</button>
            </section>
      }
    </section>
  );
};

export default Profile;
