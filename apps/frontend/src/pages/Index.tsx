import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VÃ©rtice</title>
        <meta
          name="description"
          content="Streetwear 90s com identidade urbana, caimento oversized e curadoria autoral."
        />
        <meta name="keywords" content="streetwear 90s, oversized, baggy jeans, moda urbana, vertice" />
        <link rel="canonical" href="https://vertice.com.br" />
      </Helmet>

      <main>
        <HeroSection />
        <BenefitsSection />
        <CategorySection />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
    </>
  );
};

export default Index;
