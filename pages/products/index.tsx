// import useSWR from "swr";
// import ProductCard from "../../components/ProductCard";
// import { Product } from "../../mock/fake-data";
// import { PageTitle, ProductGallery } from "./index.style";

// const fetcher = (url: string) => fetch(`/api${url}`).then((res) => res.json());

// const Home = () => {
//   const { data: products } = useSWR<Product[]>("/products", fetcher);

//   if (!products) return <div>loading</div>;

//   return (
//     <>
//       <PageTitle>商品列表</PageTitle>
//       <ProductGallery>
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </ProductGallery>
//     </>
//   );
// };

// export default Home;

import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";

import ProductCard from "../../components/ProductCard";
import { Product } from "../../mock/fake-data";
import { PageTitle, ProductGallery } from "../../styles/products.style";

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  return (
    <>
      <PageTitle>商品列表</PageTitle>
      <ProductGallery>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGallery>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  const res = await fetch(`http://localhost:8000/products`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const products = await res.json();

  return {
    props: {
      products,
      session,
    },
  };
}

export default Home;