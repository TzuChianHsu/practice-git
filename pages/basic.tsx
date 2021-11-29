import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

function Profile() {
const router = useRouter();
const { id } = router.query;
// const { data, error } = useSWR("https://jsonplaceholder.typicode.com/posts/1", fetcher);
//const { data, error} = useSWR(["https://jsonplaceholder.typicode.com/posts", id], (url, id) => fetcher(url, { id }));
const { data, error,  } = useSWR(id ? ["https://jsonplaceholder.typicode.com/posts", id] : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}

export default Profile