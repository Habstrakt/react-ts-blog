import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import styles from "./PostList.module.css";
import Spinner from "./SpinnerComponent";

interface Posts {
  id: string;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const postsUrl = "https://63b30db9ea89e3e3db3cb777.mockapi.io/posts";

  const [posts, setPosts] = useState<Array<Posts>>([]);

  async function fetchPosts() {
    try {
      const response: AxiosResponse<Posts> = await axios.get(postsUrl);

      const allPosts: Posts = response.data;

      const reversedPosts = (allPosts as unknown as Posts[]).reverse();

      setPosts(reversedPosts);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPosts().catch((error) => {
      console.log(error);
    });
  }, [setPosts]);

  if (!posts.length) {
    return (
      <div className="col-lg-9">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="col-lg-9">
      <section>
        {posts.map((post) => (
          <article key={post.id.toString()}>
            <h3>
              <Link to={`/post/${post.id}`} className={styles.text_title}>
                {post.title}
              </Link>
            </h3>
            <div className={styles.text}>{post.body}</div>
          </article>
        ))}
      </section>
      <div className="pagination justify-content-end">
        <button className="btn btn-primary">1</button>
      </div>
    </div>
  );
};

export default PostList;
