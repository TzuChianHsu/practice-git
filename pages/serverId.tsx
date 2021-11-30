import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {  Product as ProductType } from "../mock/fake-data";
import ProductCard from "../components/ProductCard";
import { PageTitle } from "./products/index.style";

// react component

interface ProductProps {
  product: ProductType;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Product = ({ product }: ProductProps) => {
  return (
    <>
      <PageTitle>商品詳細頁面</PageTitle>
      <ProductCard product={product} all />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductProps, Params> = async ({
  params,
}) => {
  // params! 是用來斷言 params 一定不是 null 或 undefined
  const api = `https://fakestoreapi.com/products/${params!.id}`;
  const res = await fetch(api);
  const json: ProductType = await res.json();

  return {
    props: { product: json },
  };
};

export default Product;