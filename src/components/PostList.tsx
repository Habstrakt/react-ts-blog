import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PostList.module.css";
import Spinner from "./SpinnerComponent";

interface Post {
  id: string;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const postsUrl = "https://63b30db9ea89e3e3db3cb777.mockapi.io/posts";

  const [posts, setPosts] = useState<Array<Post>>([]);

  async function fetchPosts() {
    try {
      const response = await axios.get<Array<Post>>(postsUrl);
      const allPosts = response.data;
      const reversedPosts = allPosts.reverse();

      setPosts(reversedPosts);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPosts();
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
