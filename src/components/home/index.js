import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./style.css";

const Home = () => {
  const history = useHistory();
  const [dataList, setDataList] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getItems(pages);
      setPages((pages) => pages + 1);
    } else {
      history.push("/");
    }
  }, []);

  const getItems = async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await axios
      .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=8`)
      .then((resp) => {
        console.log(resp.data);
        setDataList([...dataList, ...resp.data]);
      });
  };

  const fetchMoreData = () => {
    getItems(pages);
    setPages((pages) => pages + 1);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div className="home">
      <div className="nav">
        <div className="logout" onClick={logoutHandler}>
          Logout
        </div>
      </div>
      <div className="infiniteScrolling">
        <InfiniteScroll
          dataLength={dataList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="infiniteMainDiv">
            {dataList.map((item, index) => (
              <div className="mainDiv" key={index}>
                <div className="listClass">
                  <img alt="userphoto" src={item.thumbnailUrl} />
                  <div className="description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    commodi deleniti velit consequuntur iure quidem dolorum
                    deserunt sunt! Iusto, sint nihil fuga dolorum molestias
                    aspernatur facere amet cupiditate quia sequi.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
