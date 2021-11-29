import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// 目前 url 為 '/'
function Page() {
  const router = useRouter();
  const [counters, setCounters] = useState<number[]>([]);

  const handleClick = () => {
    const counter = Math.round(Math.random() * 100);
    router.push(`/?counter=${counter}`, undefined, { shallow: true });
  };

  useEffect(() => {
    if (router.query.counter) {
      setCounters((prev) => [
        ...prev,
        parseInt(router.query.counter as string),
      ]);
    }
  }, [router.query.counter]);

  return (
    <div>
      <ul>
        {counters.map((counter) => (
          <li key={counter}>{counter}</li>
        ))}
      </ul>
      <button onClick={handleClick}>add counter</button>
    </div>
  );
}

export default Page;