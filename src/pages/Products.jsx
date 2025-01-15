import React from 'react'
import Container from "../components/Container"
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useFetchApi } from '../Api/useFetchApi';
import { useQuery } from '@tanstack/react-query';

function Products() {
 const {data, isError,error,isLoading} = useQuery({
     queryKey: [`AllProducts`],
     queryFn: () =>  useFetchApi("https://fakestoreapi.com/products"),
   });
  return (
    <>
    
      <Container>
      {!isLoading  && <h1 className="flex items-center text-5xl font-extrabold light:text-black">Trending Products<span className="bg-white-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">🔥🔥</span></h1>}
      </Container>
      {isLoading ? <Container><center><Spinner /></center></Container> : null}
       {isError && <Container><center><h2>{error}</h2></center></Container>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
  {data?.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
      
   
    </>
  )
}

export default Products