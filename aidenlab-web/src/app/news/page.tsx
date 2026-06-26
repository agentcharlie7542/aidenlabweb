import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import NewsCard from '@/components/cards/NewsCard';
import { sanityFetch } from '@/sanity/lib/client';
import { getAllInsightsQuery, getFeaturedInsightsQuery } from '@/sanity/lib/queries';

export const revalidate = 3600;

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

export default async function NewsPage() {
  const [insights, featuredInsights] = await Promise.all([
    sanityFetch<Insight[]>({ query: getAllInsightsQuery }),
    sanityFetch<Insight[]>({ query: getFeaturedInsightsQuery }),
  ]);

  // Fallback data
  const mainFeatured = featuredInsights.length > 0 ? featuredInsights[0] : {
    _id: 'f1',
    category: 'FEATURED REPORT · 2026',
    title: '2026 일본 뷰티 커머스 트렌드 백서',
    description: 'Qoo10·Rakuten·@cosme·LIPS의 200+ 캠페인 데이터로 본 일본 뷰티 시장 변화와 K-뷰티의 다음 기회. 50페이지 PDF 무료 다운로드.',
    imageUrl: 'https://cdn.imweb.me/thumbnail/20260409/b4d1a0dca336b.png',
    pdfUrl: '#',
    publishedAt: '2026-05-01',
    isFeatured: true,
  };

  const displayInsights = insights.length > 0 ? insights.filter(i => i._id !== mainFeatured._id) : [
    { _id: '1', category: 'CASE', title: 'Glow u Qoo10 1위 비하인드', dateStr: '2026.05.10', imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg', publishedAt: '', isFeatured: false },
    { _id: '2', category: 'TREND', title: 'LINE 광고가 다시 뜨는 이유', dateStr: '2026.04.28', imageUrl: 'https://cdn.imweb.me/thumbnail/20260410/ca0e612af256b.png', publishedAt: '', isFeatured: false },
    { _id: '3', category: 'TREND', title: '일본 Z세대의 K-뷰티 소비 패턴 5가지', dateStr: '2026.05.02', imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/25/thumbnails/92867572135641955824.jpg', publishedAt: '', isFeatured: false },
    { _id: '4', category: 'CASE', title: 'Meal it 라쿠텐 다이어트 카테고리 톱10 후기', dateStr: '2026.04.20', imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg', publishedAt: '', isFeatured: false },
    { _id: '5', category: '에이든랩', title: '도쿄 오피스 시부야로 이전', dateStr: '2026.04.05', imageUrl: 'https://cdn.imweb.me/upload/S20230516de7df0b488e73/81c6524a4c1c2.png', publishedAt: '', isFeatured: false },
    { _id: '6', category: '트렌드', title: '2026 @cosme 베스트 코스메 분석', dateStr: '2026.03.28', imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png', publishedAt: '', isFeatured: false },
  ];

  const sideNews = displayInsights.slice(0, 2);
  const gridNews = displayInsights.slice(2);

  return (
    <main className="page active">

  <section className="svc-hero">
    <div className="wrap">
      <Eyebrow>Aidenlab Insights</Eyebrow>
      <h1 style={{marginTop: '24px'}}>일본 시장은 매주 바뀝니다.<br/><span className="cool-text">우리는 그 변화를 가장 먼저 봅니다.</span></h1>
      <p className="muted" style={{maxWidth: '680px', marginTop: '24px', fontSize: '18px'}}>200+ 캠페인 데이터, 4,000+ 인플루언서 활동, 일본 현지 MD의 인사이트가 모이는 곳.</p>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <div className="case-filter">
        <button className="chip active">전체</button>
        <button className="chip">리포트</button>
        <button className="chip">케이스</button>
        <button className="chip">트렌드</button>
        <button className="chip">프레스</button>
        <button className="chip">에이든랩 소식</button>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px'}}>
        {/* Featured Big Card */}
        <div className="case-big" style={{minHeight: 'auto'}}>
          <div className="case-cover" style={{aspectRatio: '16/8'}}>
            <span className="corner-tag">{mainFeatured.category}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mainFeatured.imageUrl} alt={mainFeatured.title} />
          </div>
          <div className="case-content">
            <span className="badge">WHITE PAPER</span>
            <h3 style={{fontSize: '32px'}}>{mainFeatured.title}</h3>
            <p className="muted" style={{fontSize: '14px', marginTop: '14px'}}>{mainFeatured.description}</p>
            {mainFeatured.pdfUrl && (
              <Button variant="primary" href={mainFeatured.pdfUrl} hasArrow style={{marginTop: '30px'}}>
                백서 다운로드
              </Button>
            )}
          </div>
        </div>
        
        {/* Side News */}
        <div style={{display: 'grid', gap: '14px'}}>
          {sideNews.map((news) => (
            <NewsCard
              key={news._id}
              imageSrc={news.imageUrl}
              category={news.category}
              title={news.title}
              dateStr={(news as Insight & { dateStr?: string }).dateStr || news.publishedAt}
            />
          ))}
        </div>
      </div>
      
      <div className="news-grid" style={{gridTemplateColumns: 'repeat(3,1fr)', marginTop: '36px'}}>
        {gridNews.map((news) => (
          <NewsCard
            key={news._id}
            imageSrc={news.imageUrl}
            category={news.category}
            title={news.title}
            dateStr={(news as Insight & { dateStr?: string }).dateStr || news.publishedAt}
          />
        ))}
      </div>
    </div>
  </section>

    </main>
  );
}
