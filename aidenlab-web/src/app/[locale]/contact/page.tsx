import { tx } from '@/i18n/translate';
import type { Locale } from '@/i18n/config';

type PageProps = { params: Promise<{ locale: Locale }> };


import Link from '@/i18n/Link';
import ContactForm from '@/components/forms/ContactForm';
import Icon from '@/components/ui/Icon';

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  return tx(
    <main className="page">

  <section className="svc-hero">
    <div className="wrap">
      <div className="eyebrow"><span className="dot"></span>Contact</div>
      <h1 style={{marginTop: '24px'}}>시작은 **30분 무료 진단**부터.</h1>
      <p className="muted" style={{maxWidth: '640px', marginTop: '24px', fontSize: '18px'}}>일본 시장 적합도, 카테고리별 매출 시뮬레이션, 6개월 로드맵을 무료로 제공합니다. 제출 후 1영업일 내 담당자가 연락드립니다.</p>
    </div>
  </section>

  <section style={{paddingTop: '0'}}>
    <div className="wrap">
      <div className="contact-grid">
        <ContactForm />
        <div className="contact-info">
          <div className="row"><div className="ico"><Icon name="mail" size={20} /></div><div><strong>일반 문의</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>admin@aidenlab.io</p></div></div>
          <div className="row"><div className="ico"><Icon name="handshake" size={20} /></div><div><strong>B2B 파트너십</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>partners@aidenlab.io</p></div></div>
          <div className="row"><div className="ico"><Icon name="briefcase" size={20} /></div><div><strong>채용 문의</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>careers@aidenlab.io · <Link href="/careers" style={{color: 'var(--accent-cyan)'}}>채용 페이지 →</Link></p></div></div>
          <div className="row"><div className="ico"><Icon name="news" size={20} /></div><div><strong>프레스 / 미디어</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>press@aidenlab.io</p></div></div>
          <div className="row"><div className="ico"><Icon name="phone" size={20} /></div><div><strong>전화</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>+82 2-6737-1922 (KR) · +81 70-4141-0466 (JP)</p></div></div>
          <div className="row"><div className="ico"><Icon name="pin" size={20} /></div><div><strong>서울 본사</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>서울 마포구 마포대로 19, 14층 (신화빌딩)</p><strong style={{marginTop: '14px', display: 'block'}}>도쿄 지사</strong><p className="muted" style={{fontSize: '13px', margin: '0'}}>東京都渋谷区神南一丁目12番14号 渋谷宮田ビル 6F</p></div></div>
        </div>
      </div>
    </div>
  </section>

    </main>
    , locale
  );
}
