import Link from "next/link";

function Home() {
  return (
    <ul>
      <li>
        <Link href="/post">
          <a>切換至 pages/post/index.tsx</a>
        </Link>
      </li>
      <li>
        <Link href="/post/123">
          <a>切換至 pages/post/[postId].tsx</a>
        </Link>
      </li>
      <li>
        <Link href="/post/2021/12/31">
          <a>切換至 pages/post/[...date].tsx</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;