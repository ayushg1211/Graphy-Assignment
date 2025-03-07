import React, { useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userList, setUserlist] = useState([]); // To Display Users
  const [isLoading, setLoading] = useState(false);
  const [exist, setExists] = useState(true);
  const [error, setError] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(15);
  const [page, setPage] = useState(1);

  async function getUserList(searchQuery, page) {
    if (!searchQuery) {
      console.log(searchQuery, "empty");
      setUserlist([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log(searchQuery);
      let response = await Axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&page=${page}&per_page=${usersPerPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      let users = response.data;
      console.log(users);
      setUserlist(users.items);
      setExists(users.items.length > 0);
    } 
    
    catch (err) {
      setError("Something went wrong while fetching users");
      console.log(err);
      setUserlist([]);
      setExists(false);
    } 
    
    finally {
      setLoading(false);
    }

  }

// Input field change
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

// Page change and API call for new page users
  const handlePageChange = (newPage) => {
    setPage(newPage);
    getUserList(username, newPage); // Fetch new page
  };


  return (
    <section className={styles.searchContainer}>


      <h1 className={styles.heading}>Github API User Search</h1>



      <section className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputField}
          value={username}
          onChange={handleInputChange}
          placeholder="Enter Username"
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={() => getUserList(username)}
        >
          Search
        </button>
      </section>



      {error && <p className={styles.error}>{error}</p>}
      {!exist && <p className={styles.noUser}>No Such user exists publically</p>}



    {/* List of users publically exists */}
      <ul className={styles.userList}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          userList.map((user) => (
            <li key={user.id}>
              <NavLink
                to={`profile/users/${user.login}`}
                target="_blank"
                className={styles.userItem}
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className={styles.userAvatar}
                />
                <span>{user.login}</span>
              </NavLink>
            </li>
          ))
        )}
      </ul>



{
  // Pagination
  userList?.length < usersPerPage && page < 2 ? "":
      <section className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => handlePageChange(page + 1)} disabled={userList.length < usersPerPage}>Next</button>
      </section>
}
    </section>
  );
};

export default Search;
