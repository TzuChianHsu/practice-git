import { FC } from "react";
import Layout from "./Layout";

const ProductsLayout: FC = ({ children }) => {
  return (
    <Layout>
      <div>product layout</div>
      {children}
    </Layout>
  );
};

export default ProductsLayout;