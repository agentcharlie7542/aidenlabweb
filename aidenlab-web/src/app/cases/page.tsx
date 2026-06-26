import Eyebrow from '@/components/ui/Eyebrow';
import CaseCard from '@/components/cards/CaseCard';
import { sanityFetch } from '@/sanity/lib/client';
import { getAllCasesQuery } from '@/sanity/lib/queries';

export const revalidate = 3600; // Revalidate every hour

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

export default async function CasesPage() {
  const cases = await sanityFetch<CaseStudy[]>({ query: getAllCasesQuery });

  // Fallback data if CMS is empty
  const displayCases = cases.length > 0 ? cases : [
    {
      _id: '1',
      isFeatured: true,
      cornerTag: 'Qoo10 · 헤어케어 · 6주',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg',
      platform: 'CASE 01 · GLOW U',
      title: '6주 만에 일본 큐텐 헤어 카테고리 1위',
      quote: '"체험단 시딩과 메가포트 광고를 동시에 진행했더니, 광고를 끊은 뒤에도 오가닉 매출이 유지됐어요."',
      kpis: [{value: '#1', label: '카테고리'}, {value: '+820%', label: '월매출'}, {value: '×4.7', label: 'ROAS'}],
      brandName: '',
      category: '',
    },
    {
      _id: '2',
      isFeatured: true,
      cornerTag: 'Rakuten · 다이어트 · 5개월',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg',
      platform: 'CASE 02 · MEAL IT',
      title: '런칭 5개월차 월매출 1.2억엔',
      quote: '"가격대가 높은 브랜드라 광고만으로는 어렵다고 했는데, 인플루언서 콘텐츠가 결정타였습니다."',
      kpis: [{value: '¥120M', label: '월매출'}, {value: '×4.8', label: 'ROAS'}, {value: '52', label: '인플루언서'}],
      brandName: '',
      category: '',
    },
    {
      _id: '3',
      isFeatured: true,
      cornerTag: 'Olive Young · 1,300매장',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/25/thumbnails/92867572135641955824.jpg',
      platform: 'CASE 03 · SUREBASE',
      title: '올리브영 1,300매장 전점 입점 돌파',
      quote: '"입점은 운이 아니라 실력. 매출 데이터·리뷰 12,000개로 MD를 설득했습니다."',
      kpis: [{value: '1,300+', label: '매장'}, {value: '12K', label: '리뷰'}, {value: '4.7★', label: '평점'}],
      brandName: '',
      category: '',
    },
    {
      _id: '4',
      isFeatured: true,
      cornerTag: 'Qoo10 · 트러블 케어',
      imageUrl: 'https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png',
      platform: 'CASE 04 · PIMPLE LAB',
      title: 'Qoo10 트러블 카테고리 1위 진입',
      quote: '"제품력은 자신 있었지만, 일본 소비자의 언어로 풀어내는 콘텐츠가 부족했습니다. 그 부분을 에이든랩이 채워줬어요."',
      kpis: [{value: '#1', label: '카테고리'}, {value: '+540%', label: '월매출'}, {value: '2,400', label: '리뷰'}],
      brandName: '',
      category: '',
    }
  ];

  return (
    <main className="page active">

  <section className="svc-hero">
    <div className="wrap">
      <Eyebrow>Case studies</Eyebrow>
      <h1 style={{marginTop: '24px'}}><span className="grad-text">100+ K-브랜드</span>의<br/>글로벌 성장 기록.</h1>
      <p className="muted" style={{maxWidth: '680px', marginTop: '24px', fontSize: '18px'}}>에이든랩과 함께한 브랜드의 실적과 비하인드를 카테고리·플랫폼별로 모아 보세요.</p>
      <div className="case-filter">
        <button className="chip active">전체</button>
        <button className="chip">Qoo10 1위</button>
        <button className="chip">Rakuten</button>
        <button className="chip">Amazon JP</button>
        <button className="chip">올리브영</button>
        <button className="chip">Beauty</button>
        <button className="chip">F&amp;B</button>
        <button className="chip">Lifestyle</button>
      </div>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <div className="case-list">
        {displayCases.map((item) => (
          <CaseCard
            key={item._id}
            variant={item.isFeatured ? 'featured' : 'default'}
            cornerTag={item.cornerTag}
            imageSrc={item.imageUrl}
            imageAlt={item.title}
            platformOrBadge={item.platform}
            title={item.title}
            quote={item.quote}
            kpis={item.kpis || []}
          />
        ))}
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px'}}>
        <div className="card" style={{textAlign: 'center'}}><div style={{fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '800', background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', color: 'transparent'}}>100+</div><p className="dim">함께한 K-브랜드</p></div>
        <div className="card" style={{textAlign: 'center'}}><div style={{fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '800', background: 'var(--grad-cool)', WebkitBackgroundClip: 'text', color: 'transparent'}}>17</div><p className="dim">Qoo10 카테고리 1위</p></div>
        <div className="card" style={{textAlign: 'center'}}><div style={{fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '800', background: 'linear-gradient(135deg,#FFC857,#FF4FB7)', WebkitBackgroundClip: 'text', color: 'transparent'}}>¥30B+</div><p className="dim">고객사 누적 매출</p></div>
        <div className="card" style={{textAlign: 'center'}}><div style={{fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '800', background: 'linear-gradient(135deg,#C8FF52,#3DE3FF)', WebkitBackgroundClip: 'text', color: 'transparent'}}>4,000+</div><p className="dim">일본 인플루언서</p></div>
      </div>
    </div>
  </section>

    </main>
  );
}
