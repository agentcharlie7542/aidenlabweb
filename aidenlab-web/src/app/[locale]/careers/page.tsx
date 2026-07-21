import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };

import Icon from '@/components/ui/Icon';


export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params;
  return tx(
    <main className="page">

  <section className="career-hero">
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>We're hiring</div>
      <h1 style={{marginTop: '24px'}}>**경계를 허무는 사람들**과 함께 합니다.</h1>
      <p className="muted" style={{maxWidth: '680px', margin: '24px auto 0', fontSize: '18px'}}>한국·일본 양국 마켓에서 K-브랜드의 글로벌화를 만드는 일. 합리적인 동료와 빠른 의사결정 속에서 일합니다.</p>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <h2>에이든랩이 일하는 방식</h2>
      <div className="career-grid">
        <div className="culture"><div className="emoji"><Icon name="bolt" size={26} /></div><div><h3>속도가 곧 경쟁력</h3><p className="muted">월 단위가 아닌 주 단위 의사결정. 모든 미팅은 결론과 다음 액션으로 끝납니다.</p></div></div>
        <div className="culture"><div className="emoji"><Icon name="chart" size={26} /></div><div><h3>모든 일은 숫자로</h3><p className="muted">의견 대립은 데이터로 해결. KPI 없는 캠페인은 시작하지 않습니다.</p></div></div>
        <div className="culture"><div className="emoji"><Icon name="globe" size={26} /></div><div><h3>한국 + 일본 듀얼</h3><p className="muted">한국 본사·도쿄 지사가 같은 슬랙·노션에서 일합니다. 일본 출장 기회 많음.</p></div></div>
        <div className="culture"><div className="emoji"><Icon name="cpu" size={26} /></div><div><h3>AI는 동료다</h3><p className="muted">모든 직군이 AI 툴을 일상적으로 사용. 사내 AI 스택 활용 교육 매주 진행.</p></div></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>채용 중인 포지션</h2>
      <div className="openings">
        <div className="row"><div>포지션</div><div>팀</div><div>고용형태</div><div>지역</div><div></div></div>
        <div className="row"><div className="pos">Senior Performance Marketer (Japan)</div><div>Performance</div><div>정규직</div><div>도쿄</div><div className="arr-r">→</div></div>
        <div className="row"><div className="pos">Global E-Commerce MD (Qoo10/Rakuten)</div><div>E-Commerce</div><div>정규직</div><div>서울</div><div className="arr-r">→</div></div>
        <div className="row"><div className="pos">Influencer PM (일본어 가능)</div><div>Marketing</div><div>정규직</div><div>서울/도쿄</div><div className="arr-r">→</div></div>
        <div className="row"><div className="pos">Brand Designer (K-Beauty PB)</div><div>Brand Studio</div><div>정규직</div><div>서울</div><div className="arr-r">→</div></div>
        <div className="row"><div className="pos">AI Engineer (Influencer Matching)</div><div>Platform</div><div>정규직</div><div>서울</div><div className="arr-r">→</div></div>
        <div className="row"><div className="pos">Content Producer (영상/숏폼)</div><div>Brand Studio</div><div>정규직/계약</div><div>서울</div><div className="arr-r">→</div></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>복지·환경</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginTop: '36px'}}>
        <div className="card"><h3 style={{fontSize: '16px'}}>⚙️ 자율 출퇴근</h3><p className="dim" style={{fontSize: '13px'}}>코어타임 11~17시</p></div>
        <div className="card"><h3 style={{fontSize: '16px'}}>🏝 일본 워케이션</h3><p className="dim" style={{fontSize: '13px'}}>연 1회 도쿄 오피스 워케이션</p></div>
        <div className="card"><h3 style={{fontSize: '16px'}}>💰 성과 인센티브</h3><p className="dim" style={{fontSize: '13px'}}>매출 기반 분기 인센티브</p></div>
        <div className="card"><h3 style={{fontSize: '16px'}}>📚 학습비 지원</h3><p className="dim" style={{fontSize: '13px'}}>연 100만원 도서·강의</p></div>
        <div className="card"><h3 style={{fontSize: '16px'}}>🍱 사내 카페테리아</h3><p className="dim" style={{fontSize: '13px'}}>점심·간식 무제한</p></div>
        <div className="card"><h3 style={{fontSize: '16px'}}>🎁 자사 제품</h3><p className="dim" style={{fontSize: '13px'}}>PB 브랜드 무상 제공</p></div>
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
