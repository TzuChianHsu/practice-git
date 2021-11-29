import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { date  } = router.query;

  return <p>Date: {date?.toString()}</p>;
};

export default Post;