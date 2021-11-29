import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { postId, helloId } = router.query;

  return <p>Post: {postId}{helloId}</p>;
};

export default Post;