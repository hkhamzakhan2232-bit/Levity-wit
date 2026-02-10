import ProductDetailsPage from '@/components/Shop/Product-Details';
import { allProducts, createSlug, getProductBySlug } from '@/lib/products-data';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return allProducts.map(p => ({ slug: createSlug(p.name) }));
}

export default function Page({ params }) {
    const slug = params.slug;
    const product = getProductBySlug(slug);
    
    if (!product) {
        return <div>Product not found</div>;
    }
    
    return <ProductDetailsPage slug={slug} product={product} />;
}
