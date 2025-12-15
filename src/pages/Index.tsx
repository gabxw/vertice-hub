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
        <title>Urban Style | Moda Urbana e Streetwear</title>
        <meta 
          name="description" 
          content="Descubra tênis, calças e blusas com estilo urbano único. Frete grátis acima de R$299. Moda streetwear para quem não aceita o comum." 
        />
        <meta name="keywords" content="tênis, calças, blusas, streetwear, moda urbana, moda masculina, moda feminina" />
        <link rel="canonical" href="https://urbanstyle.com.br" />
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
