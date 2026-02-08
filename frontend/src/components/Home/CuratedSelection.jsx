'use client';

export default function CuratedSelection() {
  const products = [
    {
      id: 1,
      image: '/images/curated/product1.jpg',
      alt: 'Woman in white shirt',
    },
    {
      id: 2,
      image: '/images/curated/product2.jpg',
      alt: 'Woman in pink ruffle top',
    },
    {
      id: 3,
      image: '/images/curated/product3.jpg',
      alt: 'Woman in green floral blouse',
    },
    {
      id: 4,
      image: '/images/curated/product4.jpg',
      alt: 'Woman in white tank top',
    },
    {
      id: 5,
      image: '/images/curated/product5.jpg',
      alt: 'Woman in olive jacket',
    },
  ];

  return (
    <section className="curated-selection">
      <div className="container">
        {/* Top row - Title and Description side by side */}
        <div className="top-row">
          <h2 className="title">
            Shop Our Limited
            <br />
            Curated Selection
          </h2>
          <p className="description">
            Changed weekly, you can find a new look right here online. If you're local, please visit our store in Easton, Maryland. You'll be glad you did. Placeholder text introducing the limited e-commerce functionality (selling a limited supply of specially curated items exclusively online and tied into social media).
          </p>
        </div>

        {/* Bottom row - Product Images */}
        <div className="images-row">
          {products.map((product) => (
            <div key={product.id} className="product-image">
              <img src={product.image} alt={product.alt} />
            </div>
          ))}
        </div>

        {/* Bottom divider line */}
        <div className="divider"></div>
      </div>

      <style jsx>{`
        .curated-selection {
          background: #ffffff;
          padding: 80px 20px 60px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .top-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          margin-bottom: 50px;
          align-items: start;
        }

        .title {
          font-family: 'Brush Script MT', cursive;
          font-size: 52px;
          color: #c9a9a0;
          font-weight: normal;
          line-height: 1.3;
        }

        .description {
          font-size: 15px;
          color: #6a6a6a;
          line-height: 1.8;
          font-weight: 300;
        }

        .images-row {
          display: flex;
          gap: 4.7rem;
          margin-bottom: 80px;
        }

        .product-image {
          flex: 0 0 auto;
          width: calc((100% - 60px) / 5);
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 4px;
        }

        .product-image:last-child {
          width: calc((100% - 60px) / 5 * 0.6);
        }

        .product-image img {
          object-fit: cover;
          display: block;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #e0d5d0;
        }

        @media (max-width: 1200px) {
          .top-row {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .title {
            font-size: 46px;
          }

          .product-image {
            width: calc((100% - 45px) / 4);
          }

          .product-image:last-child {
            display: none;
          }

          .images-row {
            overflow-x: auto;
          }
        }

        @media (max-width: 768px) {
          .curated-selection {
            padding: 60px 20px 40px;
          }

          .title {
            font-size: 42px;
          }

          .description {
            font-size: 14px;
          }

          .images-row {
            margin-bottom: 50px;
            gap: 12px;
            overflow-x: auto;
          }

          .product-image {
            width: calc((100% - 24px) / 3);
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 36px;
          }

          .product-image {
            width: calc((100% - 12px) / 2);
          }

          .images-row {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}