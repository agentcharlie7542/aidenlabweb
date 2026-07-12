'use client';

import React, { useEffect, useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import SignatureCard from '@/components/cards/SignatureCard';

const SERVICE_TABS = [
  { id: 'influencer', label: '글로벌 인플루언서' },
  { id: 'performance', label: '퍼포먼스 마케팅' },
  { id: 'ecommerce', label: '이커머스 운영대행' },
  { id: 'distribution', label: '사입 & 유통' },
  { id: 'signature', label: '시그니처 프로그램' },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('influencer');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (SERVICE_TABS.some((tab) => tab.id === hash)) setActiveTab(hash);
  }, []);

  const selectTab = (id: string) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <main className="page active">

  <section className="svc-hero">
    <div className="wrap">
      <Eyebrow>Services</Eyebrow>
      <h1 style={{marginTop: '24px'}}>하나의 파트너,<br/><span className="cool-text">통합 글로벌 솔루션</span></h1>
      <p className="muted" style={{maxWidth: '680px', marginTop: '24px', fontSize: '18px'}}>전략 · 마케팅 · 운영 · 유통까지. 에이전시 4곳에 흩어진 일을 한 팀이 합니다.</p>
      <div className="svc-tab-wrap" role="tablist" aria-label="서비스 선택">
        {SERVICE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`svc-tab ${activeTab === tab.id ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => selectTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </section>

  <div className="wrap">
    <div id="panel-influencer" className="svc-detail svc-pane" role="tabpanel" aria-labelledby="tab-influencer" hidden={activeTab !== 'influencer'}>
      <div>
        <div className="eyebrow">01 · INFLUENCER MARKETING</div>
        <h2 style={{marginTop: '18px'}}>일본 2만+ 인플루언서, <br/>AI로 매칭합니다.</h2>
        <p className="muted">わさび10 자체 플랫폼 + 외부 매크로/메가 인플루언서까지. 브랜드 톤·타겟·예산에 맞춰 AI가 후보군을 추천하고, 캠페인 운영부터 성과 분석까지 한 번에.</p>
        <div className="feat">
          <div><strong>나노 → 메가 풀스펙</strong>1만 팔로워부터 100만 팔로워까지 단계별 시딩 전략</div>
          <div><strong>플랫폼 다채널</strong>Instagram · X · TikTok · YouTube · LINE VOOM 동시 운영</div>
          <div><strong>실시간 대시보드</strong>도달·저장·구매전환을 ROAS 단위로 추적</div>
          <div><strong>일본 현지 매니저</strong>일본인 PM이 크리에이터와 직접 커뮤니케이션</div>
        </div>
        <Button variant="primary" href="/contact" hasArrow style={{marginTop: '30px'}}>상담 신청</Button>
      </div>
      <div className="vis">
        { }
        <img src="https://cdn.imweb.me/upload/S20230516de7df0b488e73/81c6524a4c1c2.png" alt="" />
      </div>
    </div>

    <div id="panel-performance" className="svc-detail svc-pane" role="tabpanel" aria-labelledby="tab-performance" hidden={activeTab !== 'performance'}>
      <div>
        <div className="eyebrow">02 · PERFORMANCE MARKETING</div>
        <h2 style={{marginTop: '18px'}}>일본 광고 효율,<br/>국내 최고 수준.</h2>
        <p className="muted">Meta · TikTok · Google · LINE · X 광고를 일본 현지 계정·결제·세무로 운영. 평균 ROAS 4.2배.</p>
        <div className="feat">
          <div><strong>매체별 전문 인력</strong>Meta·Google·LINE·TikTok 각 매체 인증 운영자 보유</div>
          <div><strong>크리에이티브 스튜디오</strong>일본인 카피라이터·디자이너가 직접 광고 소재 제작</div>
          <div><strong>주간 옵티마이저 리뷰</strong>일본·한국 합동 위클리로 캠페인 튜닝</div>
          <div><strong>후불 정산 옵션</strong>실제 매출 발생분의 % 정산 가능 (조건부)</div>
        </div>
        <Button variant="primary" href="/contact" hasArrow style={{marginTop: '30px'}}>상담 신청</Button>
      </div>
      <div className="vis">
        { }
        <img src="https://cdn.imweb.me/thumbnail/20260409/b4d1a0dca336b.png" alt="" />
      </div>
    </div>

    <div id="panel-ecommerce" className="svc-detail svc-pane" role="tabpanel" aria-labelledby="tab-ecommerce" hidden={activeTab !== 'ecommerce'}>
      <div>
        <div className="eyebrow">03 · GLOBAL E-COMMERCE</div>
        <h2 style={{marginTop: '18px'}}>Qoo10 · Rakuten · Amazon JP<br/>풀스택 운영대행.</h2>
        <p className="muted">입점 신청부터 상세페이지 제작·MD 협업·CS·반품·세무까지. 자체 일본 법인을 통한 합법적 운영.</p>
        <div className="feat">
          <div><strong>입점 컨설팅</strong>Qoo10 메가포트 / 라쿠텐 / 아마존 등록 풀패키지</div>
          <div><strong>상세페이지 현지화</strong>일본인 카피라이터 + 디자이너의 현지 톤 제작</div>
          <div><strong>MD 협업 / 행사 진행</strong>큐텐 메가할인·블랙프라이데이 등 전략적 노출</div>
          <div><strong>물류 / 통관 / CS</strong>일본 풀필먼트 센터 직접 운영 (시즈오카·도쿄)</div>
        </div>
        <Button variant="primary" href="/contact" hasArrow style={{marginTop: '30px'}}>상담 신청</Button>
      </div>
      <div className="vis">
        { }
        <img src="https://cdn.imweb.me/thumbnail/20260410/ca0e612af256b.png" alt="" />
      </div>
    </div>

    <div id="panel-distribution" className="svc-detail svc-pane" role="tabpanel" aria-labelledby="tab-distribution" hidden={activeTab !== 'distribution'}>
      <div>
        <div className="eyebrow">04 · DISTRIBUTION</div>
        <h2 style={{marginTop: '18px'}}>국내 1,300+ 매장,<br/>일본 드럭스토어까지.</h2>
        <p className="muted">올리브영·랄라블라·CU·H&amp;B 등 국내 메이저 채널, 일본 마츠모토키요시·웰시아 등 현지 드럭스토어 입점망 보유.</p>
        <div className="feat">
          <div><strong>국내 사입 &amp; 총판</strong>Serumkind, Surebase, @trendseoul 등 운영 사례</div>
          <div><strong>PB 브랜드 개발</strong>Meal it / Glow u / Pimple lab / Maldda 등 자체 4개 PB</div>
          <div><strong>해외 유통</strong>일본·동남아·미국 셀렉트숍 입점 컨설팅</div>
          <div><strong>리스크 부담</strong>매절·위탁·총판 등 유연한 거래 구조 협의</div>
        </div>
        <Button variant="primary" href="/contact" hasArrow style={{marginTop: '30px'}}>상담 신청</Button>
      </div>
      <div className="vis">
        { }
        <img src="https://cdn.imweb.me/thumbnail/20260409/cb541ecc20362.jpeg" alt="" />
      </div>
    </div>

    <div id="panel-signature" className="svc-pane" role="tabpanel" aria-labelledby="tab-signature" hidden={activeTab !== 'signature'}>
      <div className="eyebrow">SIGNATURE PROGRAM</div>
      <h2 style={{marginTop: '18px'}}>간판 프로그램 두 가지</h2>
      <div className="sig-grid" style={{marginTop: '36px'}}>
        <SignatureCard
          bgImageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg"
          eyebrowText="JAPAN GROWTH PLAN"
          numText="#1"
          title="일본 Qoo10 카테고리 1위 만들기"
          description="① 카테고리·경쟁 진단 → ② わさび10 체험단 200명 시딩 → ③ Qoo10 랭킹 부스팅 + 메가포트 광고 → ④ 8주 내 카테고리 톱10, 12주 내 1위 진입"
          bottomText={
            <div style={{marginTop: '24px', padding: '18px', border: '1px solid var(--line)', borderRadius: '12px', position: 'relative'}}>
              <div className="dim" style={{fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase'}}>3개월 패키지 / 견적 별도</div>
              <strong style={{display: 'block', color: 'var(--ink-0)', marginTop: '6px'}}>
                미달성시 운영 수수료 환급 
                <a href="#guarantee-terms" style={{fontSize: '12px', color: 'var(--ink-3)', textDecoration: 'underline', marginLeft: '6px', fontWeight: 'normal'}}>(조건 확인)</a>
              </strong>
            </div>
          }
        />
        <SignatureCard
          isCool
          bgImageSrc="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg"
          eyebrowText="LAUNCH BOOSTER"
          numText="¥1억"
          title="런칭 6개월 월매출 1억 만들기"
          description="① 브랜드 진단·일본 현지화 → ② Qoo10·Rakuten·Amazon 동시 런칭 → ③ 인플루언서 300명 시딩 + 광고 3,000만원 집행 → ④ 6개월 차 월매출 ¥1억엔 도전"
          bottomText={
            <div style={{marginTop: '24px', padding: '18px', border: '1px solid var(--line)', borderRadius: '12px', position: 'relative'}}>
              <div className="dim" style={{fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase'}}>6개월 풀패키지 / 견적 별도</div>
              <strong style={{display: 'block', color: 'var(--ink-0)', marginTop: '6px'}}>
                매출 미달 시 컨설팅 비용 환급 
                <a href="#guarantee-terms" style={{fontSize: '12px', color: 'var(--ink-3)', textDecoration: 'underline', marginLeft: '6px', fontWeight: 'normal'}}>(조건 확인)</a>
              </strong>
            </div>
          }
        />
      </div>
      <div id="guarantee-terms" className="guarantee-terms">
        <strong>성과 보장 조건 안내</strong>
        <p>세부 KPI, 필수 광고비, 상품 재고, 채널 승인 일정 및 환급 범위는 브랜드 진단 후 계약서에 명시됩니다. 상담 단계에서 적용 가능 여부와 조건을 먼저 안내드립니다.</p>
      </div>
    </div>
  </div>

  <section>
    <div className="wrap">
      <div style={{textAlign: 'center', padding: '60px 40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)', background: 'rgba(255,255,255,.02)'}}>
        <h2>가격은 매출에 맞춰서.</h2>
        <p className="muted" style={{maxWidth: '560px', margin: '18px auto 30px'}}>초기 컨설팅 무료 · 운영 수수료는 매출의 % 또는 월 고정 패키지로 협의. 30분 진단 미팅 후 맞춤 견적을 드립니다.</p>
        <Button variant="primary" href="/contact" hasArrow>무료 진단 신청하기</Button>
      </div>
    </div>
  </section>

    </main>
  );
}
