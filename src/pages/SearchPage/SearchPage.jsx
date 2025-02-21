import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchList from "../../components/SearchList/SearchList";
import styles from "./SearchPage.module.scss";
import { useParams } from "react-router-dom";
import data from "../../data/search.json";

export default function SearchPage() {
  const [search, setSearch] = useState([]);

  let { value } = useParams();
  const params = {
    part: "snippet",
    q: value,
    maxResults: 2,
    key: import.meta.env.VITE_API_KEY,
  };

  useEffect(() => {
    async function getData() {
      document.title = `${value} - YouTube`;
      // const data = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
      setSearch(data.items);
    }
    getData();
  }, []);

  return (
    <div className={styles.searchVideos}>
      {search ? (
        search.map((item, i) => {
          if (item.id.kind === "youtube#video") {
            return <SearchList data={item} key={item.id.videoId} i={i} />;
          }
        })
      ) : (
        <p>검색결과가 존재하지 않습니다.</p>
      )}
    </div>
  );
}
