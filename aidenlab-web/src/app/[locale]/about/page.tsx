import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };


export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  return tx(
    <main className="page">

  <section className="about-hero">
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>About aidenlab</div>
      <h1 style={{marginTop: '24px'}}>{'한국의 좋은 브랜드가\n**세계의 좋은 브랜드**가 되도록.'}</h1>
      <p className="muted" style={{maxWidth: '720px', margin: '24px auto 0', fontSize: '18px'}}>에이든랩은 K-브랜드와 글로벌 소비자 사이의 거리를 줄이는 일을 합니다. 데이터·AI·현지 네트워크로 매출이라는 결과를 만들어냅니다.</p>
      <div className="about-hero-img"><img src="https://cdn.imweb.me/thumbnail/20260409/10284acd42181.png" alt="aidenlab 글로벌 비즈니스" /></div>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <h2>우리가 일하는 방식</h2>
      <div className="about-grid">
        <div className="val"><div className="num">01 / VALUE</div><h3>숫자로 증명한다</h3><p className="muted">정성적 보고서가 아닌 매출·랭킹·ROAS로 말합니다. 모든 캠페인은 측정 가능한 KPI를 선언하고 시작합니다.</p></div>
        <div className="val"><div className="num">02 / VALUE</div><h3>현지에서 만든다</h3><p className="muted">도쿄·시부야 거점 + 4,000명 일본 현지 크리에이터 + 일본인 MD·CS 인력. 번역이 아닌 현지 기획.</p></div>
        <div className="val"><div className="num">03 / VALUE</div><h3>AI로 가속한다</h3><p className="muted">인플루언서 매칭, 콘텐츠 생성, 광고 입찰, 리포팅까지 자체 AI 스택으로 30배 빠르게 운영합니다.</p></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>에이든랩 성장 연혁</h2>
      <div className="timeline">
        <div className="tline"><div className="yr">2023</div><div><strong>법인 설립.</strong> 강철용 대표 중심으로 글로벌 인플루언서 마케팅 사업 시작. 첫 PB 브랜드 Meal it 런칭.</div></div>
        <div className="tline"><div className="yr">2024</div><div><strong>일본 시장 본격 진출.</strong> 도쿄 시부야 오피스 개설. わさび10 플랫폼 베타 런칭. Glow u 일본 Qoo10 헤어 카테고리 1위.</div></div>
        <div className="tline"><div className="yr">2025</div><div><strong>유통 인프라 확보.</strong> 올리브영 1,300+ 매장 입점 돌파(Meal it). Serumkind·Surebase 총판 계약. 사내 AI 시딩 솔루션 'Aiden AI' 출시.</div></div>
        <div className="tline"><div className="yr">2026</div><div><strong>스케일업.</strong> 시리즈 B 50억원 투자 유치. 동남아 확장 시작. わさび10 4,000+ 인플루언서 / 1,000만+ 팔로워 돌파.</div></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>Leadership</div>
      <h2 style={{marginTop: '18px'}}>팀이 곧 신뢰입니다</h2>
      <p className="muted" style={{maxWidth: '640px'}}>한국·일본·중화권 출신 60+ 명의 마케터·MD·크리에이터·엔지니어가 함께 합니다.</p>
      <div className="team-grid">
        <div className="member"><div className="avatar"></div><h3 style={{fontSize: '16px'}}>강철용</h3><p className="dim" style={{fontSize: '12px'}}>CEO / Founder</p></div>
        <div className="member"><div className="avatar" style={{background: 'var(--grad-hero)'}}></div><h3 style={{fontSize: '16px'}}>[CSO]</h3><p className="dim" style={{fontSize: '12px'}}>Strategy &amp; Insights</p></div>
        <div className="member"><div className="avatar" style={{background: 'linear-gradient(135deg,#FFC857,#FF4FB7)'}}></div><h3 style={{fontSize: '16px'}}>[CMO]</h3><p className="dim" style={{fontSize: '12px'}}>Global Marketing</p></div>
        <div className="member"><div className="avatar" style={{background: 'linear-gradient(135deg,#C8FF52,#3DE3FF)'}}></div><h3 style={{fontSize: '16px'}}>[CTO]</h3><p className="dim" style={{fontSize: '12px'}}>AI &amp; Platform</p></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>Investors &amp; Press</h2>
      <p className="muted" style={{marginTop: '8px'}}>에이든랩의 비전에 공감하는 파트너들과 함께합니다.</p>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginTop: '24px'}}>
        <div className="card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', fontWeight: 'bold', color: 'var(--ink-2)'}}>INVESTOR A</div>
        <div className="card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', fontWeight: 'bold', color: 'var(--ink-2)'}}>INVESTOR B</div>
        <div className="card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', fontWeight: 'bold', color: 'var(--ink-2)'}}>PRESS 1</div>
        <div className="card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', fontWeight: 'bold', color: 'var(--ink-2)'}}>PRESS 2</div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>Seoul × Tokyo</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px'}}>
        <div className="card">
          <div className="eyebrow">HQ · SEOUL</div>
          <h3 style={{marginTop: '18px'}}>서울 마포구 마포대로 19, 14층 (신화빌딩)</h3>
          <p className="muted">전략, AI, MD, 운영 본부</p>
        </div>
        <div className="card">
          <div className="eyebrow">JAPAN · TOKYO</div>
          <h3 style={{marginTop: '18px'}}>東京都渋谷区神南一丁目12番14号 渋谷宮田ビル 6階</h3>
          <p className="muted">わさび10 운영, 일본 인플루언서·CS</p>
        </div>
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
