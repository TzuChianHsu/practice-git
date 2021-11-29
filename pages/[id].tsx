import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getProductById, Product as ProductType } from "../mock/fake-data";
import ProductCard from "../components/ProductCard";
import { PageTitle } from "./products/index.style";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle>商品詳細頁面</PageTitle>
      <ProductCard product={product} all />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = getProductById(params?.id as string);

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
};

export default Product;