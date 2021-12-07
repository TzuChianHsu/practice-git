import Link from "next/link";
import { FC, useState } from "react";

const Layout: FC = ({ children }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <Link href="/">home</Link>
      <Link href="/products">product</Link>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {children}
    </div>
  );
};

export default Layout;