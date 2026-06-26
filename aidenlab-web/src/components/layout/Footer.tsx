import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand"><span className="brand-mark"></span>aidenlab</div>
            <p className="dim" style={{ fontSize: '13px', marginTop: '14px', maxWidth: '300px' }}>
              K-브랜드의 글로벌 매출을 설계합니다. <br />Seoul · Tokyo
            </p>
            <p className="dim" style={{ fontSize: '12px', marginTop: '24px' }}>
              admin@aidenlab.io · 02-6737-1922
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">인플루언서 마케팅</Link></li>
              <li><Link href="/services">퍼포먼스 마케팅</Link></li>
              <li><Link href="/services">이커머스 운영대행</Link></li>
              <li><Link href="/services">사입 &amp; 유통</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/cases">Cases</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4>Platforms</h4>
            <ul>
              <li><Link href="/wasabi10">わさび10</Link></li>
              <li><Link href="/news">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 (주)에이든랩. All rights reserved.</div>
          <div>대표 강철용 · 사업자번호 464-87-01922 · 서울 마포구 마포대로 19, 14층</div>
        </div>
      </div>
    </footer>
  );
}
