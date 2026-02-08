import ProductDetailsPage from '../../../components/Shop/Product-Details';

// Force dynamic rendering - don't try to prerender during build
export const dynamic = 'force-dynamic';

// This is a Server Component - can use async/await
export default async function Page({ params }) {
    // In Next.js 15, params is a Promise that needs to be awaited
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    return <ProductDetailsPage slug={slug} />;
}