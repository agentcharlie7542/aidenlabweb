import Link from '@/i18n/Link';
import type { Locale } from '@/i18n/config';
import { tx } from '@/i18n/translate';

export default function Footer({ locale }: { locale: Locale }) {
  return tx(
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              <span className="brand-mark" aria-hidden="true"></span>aidenlab
            </div>
            <p className="dim foot-tagline">K-브랜드의 글로벌 매출을 설계합니다.</p>
            <p className="dim foot-bases">Seoul · Tokyo</p>
            <ul className="foot-contact">
              <li>
                <a href="mailto:admin@aidenlab.io">admin@aidenlab.io</a>
              </li>
              <li>
                <a href="tel:+82267371922">+82 2-6737-1922</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>서비스</h4>
            <ul>
              <li><Link href="/services#influencer">인플루언서 마케팅</Link></li>
              <li><Link href="/services#performance">퍼포먼스 마케팅</Link></li>
              <li><Link href="/services#ecommerce">이커머스 운영대행</Link></li>
              <li><Link href="/services#distribution">사입 &amp; 유통</Link></li>
            </ul>
          </div>
          <div>
            <h4>회사</h4>
            <ul>
              <li><Link href="/about">회사소개</Link></li>
              <li><Link href="/brands">브랜드</Link></li>
              <li><Link href="/cases">성공사례</Link></li>
              <li><Link href="/careers">채용</Link></li>
            </ul>
          </div>
          <div>
            <h4>플랫폼</h4>
            <ul>
              <li><Link href="/wasabi10">와사비텐</Link></li>
              <li><Link href="/news">인사이트</Link></li>
              <li><Link href="/contact">문의하기</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 (주)에이든랩. All rights reserved.</div>
          <div>대표 강철용 · 사업자번호 464-87-01922 · 서울 마포구 마포대로 19, 14층</div>
        </div>
      </div>
    </footer>,
    locale
  );
}
