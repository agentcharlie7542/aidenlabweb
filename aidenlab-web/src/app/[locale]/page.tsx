import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };

import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import CaseCard from '@/components/cards/CaseCard';
import ServiceCard from '@/components/cards/ServiceCard';
import SignatureCard from '@/components/cards/SignatureCard';
import NewsCard from '@/components/cards/NewsCard';
import { sanityFetch } from '@/sanity/lib/client';
import { getFeaturedCasesQuery, getFeaturedInsightsQuery } from '@/sanity/lib/queries';

export const revalidate = 3600;

interface CaseStudy {
  _id: string;
  title: string;
  brandName: string;
  platform: string;
  category: string;
  isFeatured: boolean;
  cornerTag?: string;
  imageUrl: string;
  quote?: string;
  kpis: { value: string; label: string }[];
}

interface Insight {
  _id: string;
  title: string;
  category: string;
  description?: string;
  publishedAt: string;
  isFeatured: boolean;
  imageUrl: string;
  pdfUrl?: string;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const [featuredCases, featuredInsights] = await Promise.all([
    sanityFetch<CaseStudy[]>({ query: getFeaturedCasesQuery }),
    sanityFetch<Insight[]>({ query: getFeaturedInsightsQuery }),
  ]);

  // Fallbacks for Cases
  const previewCases = featuredCases.length >= 3 ? featuredCases.slice(0, 3) : [
    {
      _id: '1',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg',
      platform: 'Qoo10 · 헤어케어',
      title: '"6주 만에 일본 큐텐 헤어 카테고리 1위"',
      kpis: [{value: '#1', label: '카테고리'}, {value: '+820%', label: '월매출'}],
      brandName: '', category: '', isFeatured: false,
    },
    {
      _id: '2',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg',
      platform: 'Rakuten · 다이어트',
      title: '"런칭 5개월차, 월매출 1.2억엔 돌파"',
      kpis: [{value: '¥120M', label: '월매출'}, {value: '×4.8', label: 'ROAS'}],
      brandName: '', category: '', isFeatured: false,
    },
    {
      _id: '3',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/25/thumbnails/92867572135641955824.jpg',
      platform: 'Olive Young · 메이크업',
      title: '"올리브영 전점 1,300매장 입점 돌파"',
      kpis: [{value: '1,300+', label: '매장'}, {value: '12K', label: '리뷰'}],
      brandName: '', category: '', isFeatured: false,
    }
  ];

  // Fallbacks for Insights
  const previewInsights = featuredInsights.length >= 3 ? featuredInsights.slice(0, 3) : [
    {
      _id: '1',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20260409/b4d1a0dca336b.png',
      category: 'FEATURED REPORT',
      title: '2026 일본 뷰티 커머스 트렌드 백서',
      description: '에이든랩이 운영한 200+ 캠페인 데이터로 정리한 일본 시장 진출 플레이북.',
      publishedAt: '2026-05-01',
      isFeatured: true,
      dateStr: '2026.05 · 무료 다운로드',
    },
    {
      _id: '2',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png',
      category: 'CASE',
      title: '핌플랩, 일본 Qoo10 트러블 카테고리 1위 진입',
      publishedAt: '2026-04-28',
      isFeatured: false,
      dateStr: '2026.04.28',
    },
    {
      _id: '3',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20260410/ca0e612af256b.png',
      category: 'PRESS',
      title: '에이든랩, 시리즈 B 50억원 투자 유치',
      publishedAt: '2026-03-15',
      isFeatured: false,
      dateStr: '2026.03.15',
    }
  ];

  return tx(
    <main className="page">

  {/*  HERO  */}
  <section className="hero">
    <div className="wrap">
      <div className="hero-inner">
        <div>
          <Eyebrow>GLOBAL MARKETING × COMMERCE PARTNER</Eyebrow>
          <h1 style={{marginTop: '24px'}}>K-브랜드의 **글로벌 매출**을 설계합니다.</h1>
          <p className="hero-lead muted">일본 큐텐 카테고리 1위 17건, 런칭 6개월 만에 월매출 1억 돌파.</p>
          <p className="hero-sub dim">에이든랩은 데이터·AI·인플루언서 네트워크로 K-브랜드의 해외 매출을 만들어내는 단 하나의 파트너입니다.</p>
          <div className="hero-cta">
            <Button variant="primary" href="/contact" hasArrow>30분 무료 진단 신청</Button>
            <Button variant="ghost" href="/cases">실적 먼저 보기</Button>
          </div>
          <p className="hero-note dim">상담료 없음 · 1영업일 내 회신</p>
          <div className="hero-stats">
            <div className="stat"><div className="num">#1</div><div className="lbl">일본 Qoo10 카테고리 1위 17건</div></div>
            <div className="stat"><div className="num">¥1억+</div><div className="lbl">런칭 6개월 월매출 달성</div></div>
            <div className="stat"><div className="num">20,000+</div><div className="lbl">일본 인플루언서 네트워크</div></div>
          </div>
        </div>

        {/*  HERO ART: the proof, as text rather than baked into a photo — so it
             reads in every language and stays legible at any size.  */}
        <div className="rank-board">
          <div className="rank-head">
            <span className="rank-chip">Qoo10 JAPAN</span>
            <span className="rank-title">카테고리 1위 달성</span>
          </div>
          <ol className="rank-list">
            <li className="rank-row">
              { }
              <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg" alt="" />
              <span className="rank-brand">Glow u<em>헤어케어</em></span>
              <span className="rank-badge">1위</span>
            </li>
            <li className="rank-row">
              { }
              <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg" alt="" />
              <span className="rank-brand">MEAL IT<em>다이어트</em></span>
              <span className="rank-badge">1위</span>
            </li>
            <li className="rank-row">
              { }
              <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png" alt="" />
              <span className="rank-brand">Pimple Lab<em>트러블케어</em></span>
              <span className="rank-badge">1위</span>
            </li>
          </ol>
          <p className="rank-foot">평균 8주 내 카테고리 톱10 진입 · 누적 1위 17건</p>
        </div>
      </div>
    </div>
  </section>

  {/*  LOGO MARQUEE  */}
  <section style={{padding: '0'}}>
    <div className="wrap" style={{paddingTop: '60px', paddingBottom: '20px'}}>
      <p className="dim" style={{fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px'}}>100+ K-Brands &amp; Global Partners</p>
    </div>
    <div className="marquee-wrap">
      <div className="marquee">
        <span className="ml">MEAL IT</span><span className="sep">·</span><span className="ml">GLOW U</span><span className="sep">·</span><span className="ml">PIMPLE LAB</span><span className="sep">·</span><span className="ml">MALDDA</span><span className="sep">·</span><span className="ml">SERUMKIND</span><span className="sep">·</span><span className="ml">SUREBASE</span><span className="sep">·</span><span className="ml">@TRENDSEOUL</span><span className="sep">·</span><span className="ml">OLIVE YOUNG 1,300+</span><span className="sep">·</span><span className="ml">Qoo10</span><span className="sep">·</span><span className="ml">RAKUTEN</span><span className="sep">·</span><span className="ml">@COSME</span><span className="sep">·</span><span className="ml">LIPS</span><span className="sep">·</span><span className="ml">AMAZON JP</span>
        <span className="ml">MEAL IT</span><span className="sep">·</span><span className="ml">GLOW U</span><span className="sep">·</span><span className="ml">PIMPLE LAB</span><span className="sep">·</span><span className="ml">MALDDA</span><span className="sep">·</span><span className="ml">SERUMKIND</span><span className="sep">·</span><span className="ml">SUREBASE</span><span className="sep">·</span><span className="ml">@TRENDSEOUL</span><span className="sep">·</span><span className="ml">OLIVE YOUNG 1,300+</span><span className="sep">·</span><span className="ml">Qoo10</span><span className="sep">·</span><span className="ml">RAKUTEN</span><span className="sep">·</span><span className="ml">@COSME</span><span className="sep">·</span><span className="ml">LIPS</span><span className="sep">·</span><span className="ml">AMAZON JP</span>
      </div>
    </div>
  </section>

  {/*  SIGNATURE OFFERS  */}
  <section className="signature">
    <div className="wrap">
      <Eyebrow>Signature Services</Eyebrow>
      <h2 style={{marginTop: '18px'}}>에이든랩만의 **간판 서비스**</h2>
      <p className="muted" style={{maxWidth: '680px'}}>시장의 평균이 아닌, 1위를 만드는 두 가지 보장형 프로그램. 모든 캠페인은 데이터 진단부터 시작됩니다.</p>

      <div className="sig-grid">
        <SignatureCard
          bgImageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg"
          eyebrowText="JAPAN GROWTH PLAN"
          numText="#1"
          title="일본 Qoo10 카테고리 1위 만들기"
          description="랭킹 알고리즘 기반 부스팅 + 일본 체험단(わさび10) + 인플루언서 시딩의 3단 결합. 평균 8주 내 카테고리 톱10 진입 보장."
          linkHref="/services"
          linkText="프로그램 자세히 보기 →"
        />
        <SignatureCard
          isCool
          bgImageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg"
          eyebrowText="LAUNCH BOOSTER"
          numText="¥1억"
          title="런칭 6개월 월매출 1억 만들기"
          description="브랜드 진단 → 일본 현지화 → 멀티채널 동시 런칭(Qoo10·Rakuten·Amazon·Instagram) → 성과형 운영대행. 매출 미달 시 컨설팅 비용 환급."
          linkHref="/services"
          linkText="프로그램 자세히 보기 →"
        />
      </div>
    </div>
  </section>

  {/*  SERVICES  */}
  <section>
    <div className="wrap">
      <Eyebrow>What we do</Eyebrow>
      <h2 style={{marginTop: '18px'}}>브랜드 전략부터 매출까지, **통합 글로벌 서비스**</h2>
      <div className="svc-grid">
        <ServiceCard
          icon="megaphone"
          title="글로벌 인플루언서 마케팅"
          description="일본 2만+ 인플루언서 네트워크와 AI 매칭으로 ROI 입증된 시딩·콘텐츠 캠페인."
          linkText="Marketing →"
          href="/services#influencer"
        />
        <ServiceCard
          isCool
          icon="cart"
          title="글로벌 이커머스 운영대행"
          description="Qoo10·Rakuten·Amazon JP·Yahoo쇼핑 입점·MD협업·CS·반품까지 풀스택."
          linkText="E-Commerce →"
          href="/services#ecommerce"
        />
        <ServiceCard
          icon="package"
          title="PB 브랜드 개발 &amp; 유통"
          description="Meal it·Glow u·Pimple Lab·Maldda — 직접 만들고 키운 브랜드 4종."
          linkText="Brands →"
          href="/brands"
        />
        <ServiceCard
          isCool
          icon="truck"
          title="상품 사입 &amp; 총판"
          description="국내 올리브영 1,300+ 매장 / 일본 드럭스토어 입점 유통망 보유."
          linkText="Distribution →"
          href="/services#distribution"
        />
      </div>
    </div>
  </section>

  {/*  WASABI10 BRIDGE  */}
  <section style={{paddingTop: '60px'}}>
    <div className="wrap">
      <div className="bridge">
        <div>
          <Eyebrow className="!bg-pink-500/10 !border-pink-500/30" dotColor="var(--accent-magenta)">OUR OWN PLATFORM</Eyebrow>
          <h2 style={{marginTop: '18px'}}>일본 체험단 마케팅의 표준 **わさび10 (Wasabi10)**</h2>
          <p className="muted">4,000+ 일본 현지 인플루언서, 누적 팔로워 1,000만+. 브랜드 등록 후 3개월 무료, Qoo10·Rakuten·Instagram·X 동시 캠페인.</p>
          <div className="meta">
            <div><strong>4,000+</strong>현지 인플루언서</div>
            <div><strong>10M+</strong>누적 팔로워</div>
            <div><strong>3개월</strong>무료 이용</div>
          </div>
          <div style={{marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <Button variant="primary" href="/wasabi10" hasArrow>わさび10 자세히</Button>
            <Button variant="ghost" href="https://wasabi10.com">플랫폼 바로가기</Button>
          </div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div className="phone-mock">
            <div className="screen">
              <div className="topnav">
                <div className="logo">わさび10</div>
                <div className="menu">≡</div>
              </div>
              <div className="product-card" style={{aspectRatio: '1.1/1'}}>
                { }
                <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/28/thumbnails/07962524302750844486.png" alt="Pureka" />
                <div className="price">3,000 ¥P</div>
                <div className="title">飲むサラダ Pureka ウォーターミックス4種</div>
              </div>
              <div className="grid2">
                <div className="product-card">
                  { }
                  <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg" alt="Glow u" />
                  <div className="price">8,900 ¥P</div>
                  <div className="title">Glow u 韓国ヘアアイロン</div>
                </div>
                <div className="product-card">
                  { }
                  <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg" alt="MEAL IT" />
                  <div className="price">3,900 ¥P</div>
                  <div className="title">MEAL IT 置き換えプロテイン</div>
                </div>
              </div>
              <div className="footer">今すぐ申し込み →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  CASES PREVIEW  */}
  <section>
    <div className="wrap">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '20px'}}>
        <div>
          <Eyebrow>Proven Results</Eyebrow>
          <h2 style={{marginTop: '18px'}}>숫자로 증명하는 **성장 파트너**</h2>
        </div>
        <Button variant="ghost" href="/cases" hasArrow>모든 사례 보기</Button>
      </div>
      <div className="case-grid">
        {previewCases.map((item) => (
          <CaseCard
            key={item._id}
            imageSrc={item.imageUrl}
            imageAlt={item.title}
            platformOrBadge={item.platform}
            title={item.title}
            kpis={item.kpis || []}
          />
        ))}
      </div>
    </div>
  </section>

  {/*  PROCESS  */}
  <section>
    <div className="wrap">
      <Eyebrow>How we work</Eyebrow>
      <h2 style={{marginTop: '18px'}}>4단계 성장 프로세스</h2>
      <p className="muted" style={{maxWidth: '680px'}}>진단·전략·실행·증명. 모든 캠페인은 데이터 기반 진단으로 시작합니다.</p>
      <div className="proc">
        <div className="step"><h3>Diagnose</h3><p>브랜드 진단, 일본 시장·경쟁사 분석, KPI 셋업</p></div>
        <div className="step"><h3>Localize</h3><p>일본 현지화 카피·비주얼·패키지, MD 매칭</p></div>
        <div className="step"><h3>Launch</h3><p>채널 동시 런칭, 인플루언서 시딩, 광고 운영</p></div>
        <div className="step"><h3>Scale</h3><p>주간 리포팅, A/B 테스트, 카테고리 1위 부스팅</p></div>
      </div>
    </div>
  </section>

  {/*  INSIGHTS  */}
  <section>
    <div className="wrap">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '20px'}}>
        <div>
          <Eyebrow>Aidenlab Insights</Eyebrow>
          <h2 style={{marginTop: '18px'}}>일본 시장의 변화를 가장 먼저</h2>
        </div>
        <Button variant="ghost" href="/news" hasArrow>모든 인사이트</Button>
      </div>
      <div className="news-grid">
        {previewInsights.map((insight) => (
          <NewsCard
            key={insight._id}
            isFeatured={insight.isFeatured}
            imageSrc={insight.imageUrl}
            category={insight.category}
            title={insight.title}
            description={insight.description}
            dateStr={(insight as Insight & { dateStr?: string }).dateStr || insight.publishedAt}
            href={(insight as Insight).pdfUrl || '/news'}
          />
        ))}
      </div>
    </div>
  </section>

  {/*  CTA  */}
  <section style={{padding: '80px 0'}}>
    <div className="wrap">
      <div style={{position: 'relative', textAlign: 'center', padding: '80px 40px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg,rgba(124,92,255,.18),rgba(255,79,183,.12))', border: '1px solid var(--line-2)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: '0', background: 'url(\'https://cdn.imweb.me/upload/S20230516de7df0b488e73/81c6524a4c1c2.png\') center/cover', opacity: '.12', mixBlendMode: 'overlay', pointerEvents: 'none'}}></div>
        <div style={{position: 'relative'}}>
          {/* Social proof immediately before the ask — the last thing read
              should be another brand's result, not our own claim. */}
          <blockquote className="cta-quote">
            <p>&ldquo;3개월 만에 일본 Qoo10 카테고리 1위. 대행사가 아니라 사업 파트너에 가깝습니다.&rdquo;</p>
            <cite>Glow u · 브랜드 총괄</cite>
          </blockquote>
          <Eyebrow>Ready to grow?</Eyebrow>
          <h2 style={{marginTop: '18px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto'}}>한국에서 검증된 브랜드, **일본에서 한 번 더 폭발시킵니다.**</h2>
          <p className="muted" style={{maxWidth: '600px', margin: '18px auto 30px'}}>30분 무료 진단 신청 — 일본 시장 적합도, 카테고리별 매출 시뮬레이션, 6개월 로드맵을 받아보세요.</p>
          <Button variant="primary" href="/contact" hasArrow>무료 진단 신청하기</Button>
        </div>
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
