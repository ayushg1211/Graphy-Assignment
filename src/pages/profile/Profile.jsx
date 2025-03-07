import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import Repositories from "../../components/repositories/Repositories";
import Pagination from "../../components/pagination/Pagination";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const { uname: username } = useParams(); // Getting the username from URL
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1) ;
  const [empty, setEmpty] = useState(true) ;
  const [reposPerPage, setReposPerPage] = useState(10) ;

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
        setEmpty(reposResponse.data.length > 0) ;
        setRepos(reposResponse.data);
      } 
      catch (err) {
        setError("User not found or API rate limit exceeded.");
        setExists(false);
      } 
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username, page]);



// Error Display
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

      {!empty && <p className={styles.noUser}>No repositories found.</p>}

      <Repositories repos={repos} page={page} setPage={setPage} reposPerPage={reposPerPage}/>
      
      {
        // Pagination
        repos?.length < reposPerPage && page < 2 ? "":
         <Pagination page={page} setPage={setPage} reposPerPage={reposPerPage} totalRepos={user.public_repos}/>
      }
      

    </section>
  );
};

export default Profile;
