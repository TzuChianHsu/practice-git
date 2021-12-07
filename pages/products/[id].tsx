import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import { Product as ProductType } from "../../mock/fake-data";
// import ProductCard from "../../components/ProductCard";
import { PageTitle, ProductContainer, BackLink } from "../../styles/products.[id].style";
import { isEmpty } from "lodash"

// 適合 dynamic import 的 component
// 像是 Modal、Drawer 等等會等待跟使用者互動後才顯示的 component，換句話說，並不是每位使用者都會用到的 component
import dynamic from "next/dynamic";
const ProductCard = dynamic(import("../../components/ProductCard"));

type Params = {
  id: string;
  accessToken: string;
};

const fetcher = (url: string, { id, accessToken }: Params) => {
  return fetch(`http://localhost:8000${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();

  const params = useMemo(
    () => ({ id, accessToken: session?.accessToken }),
    [id, session]
  );

  const { data: product, error } = useSWR<ProductType>(
    id && !loading ? ["/products", params] : null,
    fetcher
  );

  if (!product || error) return <div>loading</div>;


  return (
    <>
      <PageTitle>商品詳細頁面</PageTitle>
      <BackLink>
        <Link href="/products">回產品列表</Link>
      </BackLink>
      <ProductContainer>
        <ProductCard product={product} all />
      </ProductContainer>
    </>
  );
};

export default Product;