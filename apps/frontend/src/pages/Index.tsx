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
        <title>VERTICE | Streetwear autoral para o dia a dia</title>
        <meta
          name="description"
          content="Drop com identidade underground, fit comercial e curadoria de tenis, calcas, blusas e acessorios para uso diario."
        />
        <meta name="keywords" content="streetwear, moda urbana, tenis, calcas, blusas, acessorios, estilo autoral" />
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
