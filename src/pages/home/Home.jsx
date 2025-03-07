import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import debounce from "lodash.debounce";
import Search from "../../components/Search";

const Home = () => {

  
  // useEffect(()=>{
  //   if(username){
  //   debounceSearch(username)
  //   }
  // },[username])

  return (
    <>
      <Search/>
    </>
  );
};

export default Home;
