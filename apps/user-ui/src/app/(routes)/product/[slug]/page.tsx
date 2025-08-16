


import ProductDetails from 'apps/user-ui/src/shared/modules/hero/product/product-details';
import axiosInstance from 'apps/user-ui/src/utils/axiosInstance';
import { Metadata } from 'next';
import React from 'react'


async function fetchProductDetails(slug:string){
    const response = await axiosInstance.get(`/api/get-product/${slug}`);
    return response.data.product
}

export async function generateMetadata({
    
    params,
} : {
   params: {slug: string}; 
}) : Promise<Metadata> {
    const product = await fetchProductDetails(params.slug)
    console.log("SERVER URI:", process.env.NEXT_PUBLIC_SERVER_URI);


    return {
        title: `${product?.title} | B2bAgroAfrica Marketplace`,
        description:
        product?.short_description ||
        "Discover high quality products on B2bAgroAfrica Marketplace.",
        openGraph: {
            title: product?.title,
            description: product?.short_description || "",
            images: [product ?. images?.[0]?.url || "/default-image.jpg"],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product?.title,
            description: product?.short_description || "",
            images: [product ?. images?.[0]?.url || "/default-image.jpg"],
            
        },
    }
}

const Page =  async ({ params }: { params: { slug: string } }) => {
    const productDetails = await fetchProductDetails(params?.slug);

  return <ProductDetails productDetails={productDetails}/>
}

export default Page
