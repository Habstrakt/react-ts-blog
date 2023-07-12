import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/SpinnerComponent";

import styles from "./PostPage.module.css";

interface Post {
  id: string;
  title: string;
  body: string;
}

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postUrl = `https://63b30db9ea89e3e3db3cb777.mockapi.io/posts/${id}`;
        const response = await axios.get<Post>(postUrl);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="col-lg-8">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="col-lg-8">
      <section>
        <article>
          <Link to={"/"}>
            <h3 className={styles.text_title}>{post?.title}</h3>
          </Link>
          <div className={styles.text}>{post?.body}</div>
        </article>
      </section>
    </div>
  );
};

export default Post;
