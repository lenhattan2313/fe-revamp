import { useGetAllProductDraft } from '../api/product';

const ProductPage = () => {
  const { data, isLoading } = useGetAllProductDraft();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Product list</h1>
      {data?.metadata.map((product) => (
        <p key={product._id}>{product.product_name}</p>
      ))}
    </div>
  );
};

export default ProductPage;
