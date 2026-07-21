import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };

import Link from '@/i18n/Link';


export default async function Wasabi10Page({ params }: PageProps) {
  const { locale } = await params;
  return tx(
    <main className="page">

  <section className="wasabi-hero">
    <div className="wrap">
      <div className="eyebrow" style={{background: 'rgba(255,79,183,.1)', borderColor: 'rgba(255,79,183,.4)'}}><span className="dot" style={{background: 'var(--accent-magenta)', boxShadow: '0 0 8px var(--accent-magenta)'}}></span>Owned Platform · Operated by aidenlab</div>
      <h1 style={{marginTop: '24px'}}>{'**わさび10**\n일본 체험단 마케팅의 표준.'}</h1>
      <p className="muted" style={{maxWidth: '720px', margin: '24px auto 0', fontSize: '18px'}}>4,000+ 일본 현지 인플루언서가 직접 활동하는 자체 플랫폼. 브랜드 등록 후 3개월 무료, 캠페인은 단 3일 만에 오픈됩니다.</p>
      <div style={{marginTop: '36px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
        <a className="btn btn-primary" href="https://wasabi10.com" target="_blank" rel="noreferrer">わさび10 바로가기 <span className="arr" aria-hidden="true">→</span></a>
        <Link className="btn btn-ghost" href="/contact">B2B 상담</Link>
      </div>
      <div className="wasabi-stats">
        <div className="stat"><div className="num">4,000+</div><div className="lbl">일본 현지 인플루언서</div></div>
        <div className="stat"><div className="num">10M+</div><div className="lbl">누적 팔로워</div></div>
        <div className="stat"><div className="num">200+</div><div className="lbl">진행 캠페인</div></div>
        <div className="stat"><div className="num">3개월</div><div className="lbl">신규 브랜드 무료</div></div>
      </div>
    </div>
  </section>

  {/*  LIVE CAMPAIGNS GRID  */}
  <section style={{paddingTop: '120px'}}>
    <div className="wrap">
      <div className="eyebrow"><span className="dot" style={{background: 'var(--accent-magenta)', boxShadow: '0 0 8px var(--accent-magenta)'}}></span>Now Running</div>
      <h2 style={{marginTop: '18px'}}>지금 진행 중인 일본 캠페인</h2>
      <p className="muted">わさび10에서 매주 새로운 K-브랜드 캠페인이 오픈됩니다. 실시간 현황을 확인하세요.</p>
      <div className="campaign-grid">
        <div className="camp">
          <span className="platform-pill">INSTAGRAM</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/28/thumbnails/07962524302750844486.png" alt="" />
          <div className="meta"><div className="ttl">飲むサラダ Pureka<br/>ウォーターミックス4種</div><div className="price">3,000 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">X</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/27/thumbnails/39485242957471666148.png" alt="" />
          <div className="meta"><div className="ttl">iHEAL X投稿キャンペーン</div><div className="price">2,000 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">INSTAGRAM</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/26/thumbnails/71798732318587195651.png" alt="" />
          <div className="meta"><div className="ttl">iHEAL トラブルケア</div><div className="price">2,000 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">INSTAGRAM</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/25/thumbnails/92867572135641955824.jpg" alt="" />
          <div className="meta"><div className="ttl">シュアベース クッション<br/>ファンデーション</div><div className="price">3,000 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">QOO10</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/24/thumbnails/43043853492376211178.jpg" alt="" />
          <div className="meta"><div className="ttl">Pureka ピュレカ</div><div className="price">5,443 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">QOO10</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/23/thumbnails/02666119874050051589.jpg" alt="" />
          <div className="meta"><div className="ttl">Glow u 韓国ヨシンモリ<br/>ヘアアイロン</div><div className="price">8,900 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">QOO10</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/22/thumbnails/04173423333246427204.jpg" alt="" />
          <div className="meta"><div className="ttl">MEAL IT 置き換え<br/>ダイエットプロテイン</div><div className="price">3,900 ¥P</div></div>
        </div>
        <div className="camp">
          <span className="platform-pill">QOO10</span>
          <img src="https://d6h4b98pf88d8.cloudfront.net/trial-marketings/21/thumbnails/35393325283819660614.png" alt="" />
          <div className="meta"><div className="ttl">ILOアイロ スリムカット<br/>ゼリー1+1 28本</div><div className="price">7,554 ¥P</div></div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <h2>3단계로 끝나는 일본 체험단</h2>
      <div className="proc">
        <div className="step"><h3>브랜드 등록</h3><p>わさび10 비즈니스 계정 가입 (1분), 상품·캠페인 정보 입력</p></div>
        <div className="step"><h3>인플루언서 매칭</h3><p>AI 추천 + 일본 PM 큐레이션. 평균 24시간 내 후보 풀 확정</p></div>
        <div className="step"><h3>발송 &amp; 콘텐츠</h3><p>일본 풀필먼트에서 제품 발송. 7~14일 내 콘텐츠 업로드</p></div>
        <div className="step"><h3>리포트 &amp; 재구매</h3><p>도달·저장·구매전환 대시보드 + 자사몰 재구매 캠페인 연동</p></div>
      </div>
    </div>
  </section>

  <section>
    <div className="wrap">
      <div style={{textAlign: 'center', padding: '80px 40px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg,rgba(255,79,183,.2),rgba(255,200,87,.1))', border: '1px solid var(--line-2)'}}>
        <h2>지금 등록하면 **3개월 무료.**</h2>
        <p className="muted" style={{maxWidth: '600px', margin: '18px auto 30px'}}>わさび10는 에이든랩이 운영하는 자체 플랫폼입니다. 별도 계약 없이 즉시 캠페인을 시작할 수 있습니다.</p>
        <a className="btn btn-primary" href="https://wasabi10.com" target="_blank">わさび10 무료 등록 <span className="arr">→</span></a>
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
