
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="page active">

  <section className="svc-hero">
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>Contact</div>
      <h1 style={{marginTop: '24px'}}>시작은 <span className="grad-text">30분 무료 진단</span>부터.</h1>
      <p className="muted" style={{maxWidth: '640px', marginTop: '24px', fontSize: '18px'}}>일본 시장 적합도, 카테고리별 매출 시뮬레이션, 6개월 로드맵을 무료로 제공합니다. 제출 후 1영업일 내 담당자가 연락드립니다.</p>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <div className="contact-grid">
        <form className="contact-form">
          <div className="field"><label>관심 서비스</label>
            <select>
              <option>일본 Qoo10 1위 만들기 (Japan Growth Plan)</option>
              <option>런칭 6개월 1억 만들기 (Launch Booster)</option>
              <option>글로벌 인플루언서 마케팅</option>
              <option>퍼포먼스 마케팅</option>
              <option>이커머스 운영대행</option>
              <option>국내·일본 유통 입점</option>
              <option>わさび10 (B2B)</option>
              <option>기타 / 일반 문의</option>
            </select>
          </div>
          <div className="field"><label>회사명 / 브랜드명</label><input placeholder="예: aidenlab" /></div>
          <div className="field" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px'}}>
            <div><label>담당자명</label><input placeholder="홍길동" /></div>
            <div><label>직책</label><input placeholder="마케팅 매니저" /></div>
          </div>
          <div className="field" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px'}}>
            <div><label>이메일</label><input type="email" placeholder="hello@brand.com" /></div>
            <div><label>전화번호</label><input placeholder="010-0000-0000" /></div>
          </div>
          <div className="field"><label>월매출 / 카테고리</label>
            <select>
              <option>월 1천만 미만 / 런칭 준비중</option>
              <option>월 1천~5천만원</option>
              <option>월 5천만~3억원</option>
              <option>월 3억 이상</option>
            </select>
          </div>
          <div className="field"><label>문의 내용</label><textarea placeholder="진행하고 싶은 시장, 일정, 예산 등을 자유롭게 적어주세요."></textarea></div>
          <div className="field" style={{fontSize: '12px', color: 'var(--ink-3)'}}>제출 시 개인정보 처리방침에 동의한 것으로 간주됩니다.</div>
          <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>무료 진단 신청 <span className="arr">→</span></button>
        </form>
        <div className="contact-info">
          <div className="row"><div className="ico">📧</div><div><strong>일반 문의</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>admin@aidenlab.io</p></div></div>
          <div className="row"><div className="ico">🤝</div><div><strong>B2B 파트너십</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>partners@aidenlab.io</p></div></div>
          <div className="row"><div className="ico">💼</div><div><strong>채용 문의</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>careers@aidenlab.io · <Link href="/careers" style={{color: 'var(--accent-cyan)'}}>채용 페이지 →</Link></p></div></div>
          <div className="row"><div className="ico">📰</div><div><strong>프레스 / 미디어</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>press@aidenlab.io</p></div></div>
          <div className="row"><div className="ico">📞</div><div><strong>전화</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>+82 2-6737-1922 (KR) · +81 70-4141-0466 (JP)</p></div></div>
          <div className="row"><div className="ico">📍</div><div><strong>서울 본사</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>서울 마포구 마포대로 19, 14층 (신화빌딩)</p><strong style={{marginTop: '14px', display: 'block'}}>도쿄 지사</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>東京都渋谷区神南一丁目12番14号 渋谷宮田ビル 6F</p></div></div>
        </div>
      </div>
    </div>
  </section>

    </main>
  );
}
