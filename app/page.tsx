"use client";

import { useEffect, useState } from 'react';
import Container from './components/Container';
import HomeBanner from './components/HomeBanner';
import ProductCard from './components/products/ProductCard';
import NullData from './components/NullData';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Récupérer les paramètres de catégorie et de recherche depuis l'URL
        const category = params?.get('category') || '';
        const searchTerm = params?.get('searchTerm') || '';

        const response = await fetch(`/api/products?category=${category}&searchTerm=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`);
        const { products, totalProducts } = await response.json();

        setProducts(products);
        setTotalProducts(totalProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, params]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (products.length === 0) {
    return <NullData title={"Ooops ! Pas d'article trouvés."} />;
  }

  return (
    <div>
      <Container>
        <div className="p-8">
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-4 rounded bg-gray-600 text-white hover:bg-gray-700 transition-all ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Précédent
          </button>
          <span className="text-lg text-gray-700">
            <span className="font-bold">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-4 rounded bg-gray-600 text-white hover:bg-gray-700 transition-all ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Suivant
          </button>
        </div>
      </Container>
    </div>
  );
}
