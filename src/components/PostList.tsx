import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./PostList.module.css";
import Spinner from "./SpinnerComponent";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<
    Array<{ id: string; title: string; body: string }>
  >([]);

  useEffect(() => {
    const postsUrl = "https://63b30db9ea89e3e3db3cb777.mockapi.io/posts";
    axios.get(postsUrl).then((response) => {
      const allPosts = response.data;
      setPosts(allPosts.reverse());
    });
  }, [setPosts]);
  console.log(posts);

  if (posts.length == 0) {
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
          <article key={post.id}>
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
