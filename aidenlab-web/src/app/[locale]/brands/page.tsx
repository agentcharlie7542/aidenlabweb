import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };

import Eyebrow from '@/components/ui/Eyebrow';
import BrandCard from '@/components/cards/BrandCard';

export default async function BrandsPage({ params }: PageProps) {
  const { locale } = await params;
  return tx(
    <main className="page">

  <section className="svc-hero">
    <div className="wrap">
      <Eyebrow>Our Brands</Eyebrow>
      <h1 style={{marginTop: '24px'}}>우리는 **브랜드를 만들고 키우는 회사**이기도 합니다.</h1>
      <p className="muted" style={{maxWidth: '680px', marginTop: '24px', fontSize: '18px'}}>에이든랩이 직접 기획·런칭한 PB 브랜드와, 유통 파트너십을 맺은 K-브랜드를 소개합니다.</p>
    </div>
  </section>

  <section style={{paddingTop: '20px'}}>
    <div className="wrap">
      <Eyebrow>PB Brands · Owned by aidenlab</Eyebrow>
      <h2 style={{marginTop: '18px'}}>자체 브랜드 4종</h2>
      <div className="brand-grid">
        <BrandCard
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg"
          category="F&B · DIET"
          brandName="Meal it"
          tagline="Grab it, Taste it, Love it"
          description="단백질 셰이크에서 시작해 건강식·이너뷰티까지. 누적 판매 300만 개, 올리브영 1,300매장 입점, 일본 메가포 1위."
          tags={['OLIVE YOUNG', 'RAKUTEN #1', 'AMAZON US']}
        />

        <BrandCard
          variantClass="b2"
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg"
          category="BEAUTY · HAIR TOOL"
          brandName="Glow u"
          tagline="Own Your Glow"
          description="빈티지 감성 헤어 스타일링 툴. 일본 Qoo10 헤어 카테고리 1위. Amazon US·Qoo10 JP 동시 운영."
          tags={['Qoo10 #1', 'AMAZON US', 'INSTAGRAM']}
        />

        <BrandCard
          variantClass="b3"
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png"
          category="BEAUTY · TROUBLE CARE"
          brandName="Pimple Lab"
          tagline="Spot it, Stick it, Clear it"
          description="과학적으로 입증된 식물성 성분. 안전하고 편리한 홈케어 솔루션. Amazon US·Singapore Shopee 진출."
          tags={['AMAZON US', 'SHOPEE SG', 'Qoo10 JP']}
        />

        <BrandCard
          variantClass="b4"
          imageSrc="https://cdn.imweb.me/thumbnail/20260409/cb541ecc20362.jpeg"
          category="BEAUTY · SKINCARE"
          brandName="Maldda 말따"
          tagline="Stay Maldda, Stay Radiant"
          description="한국 자연 유래 + 서양 기능 성분 처방. 클렌징·기본 스킨케어·하이드로겔 마스크 라인."
          tags={['BRAND.SITE', 'INSTAGRAM', 'NEW LAUNCH']}
        />
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <Eyebrow>Partner Brands · Distribution</Eyebrow>
      <h2 style={{marginTop: '18px'}}>유통/총판 브랜드</h2>
      <p className="muted">에이든랩이 국내·일본 유통을 담당하는 K-뷰티 파트너 브랜드.</p>
      <div className="brand-grid">
        <BrandCard
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/25/thumbnails/92867572135641955824.jpg"
          category="MAKEUP · DISTRIBUTION"
          brandName={<span style={{background: 'linear-gradient(135deg,#FFC857,#C8FF52)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Surebase</span>}
          tagline="Sure-fit cushion foundation"
          description="올리브영 메가브랜드. 쿠션·베이스 라인의 국내외 총판."
          tags={['OLIVE YOUNG', 'JP DRUGSTORE']}
        />
        
        <BrandCard
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/28/thumbnails/07962524302750844486.png"
          category="F&B · WELLNESS"
          brandName={<span style={{background: 'linear-gradient(135deg,#7C5CFF,#3DE3FF)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Pureka</span>}
          tagline="飲むサラダ — 마시는 샐러드"
          description="일본 시장 진출 워터믹스 라인. 4종 SKU."
          tags={['WASABI10', 'QOO10 JP']}
        />

        <BrandCard
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/21/thumbnails/35393325283819660614.png"
          category="F&B · DIET"
          brandName={<span style={{background: 'linear-gradient(135deg,#FF4FB7,#FFC857)', WebkitBackgroundClip: 'text', color: 'transparent'}}>ILO</span>}
          tagline="Slim-cut diet jelly"
          description="슬림컷 젤리·맥번 코어컷 다이어트 라인. Qoo10 JP 운영."
          tags={['QOO10 JP', 'WASABI10']}
        />

        <BrandCard
          imageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/19/thumbnails/28548608927119458348.jpg"
          category="BEAUTY · PDRN"
          brandName={<span style={{background: 'linear-gradient(135deg,#3DE3FF,#C8FF52)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Dr.Reju</span>}
          tagline="All-PDRN Rejuvenating Cream"
          description="PDRN 리주비네이팅 크림. 일본 인플루언서 마케팅 진행 중."
          tags={['WASABI10', 'INSTAGRAM']}
        />
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
