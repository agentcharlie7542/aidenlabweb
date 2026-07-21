'use client';

import { FormEvent, useState } from 'react';
import { useT } from '@/i18n/LocaleProvider';

const CONTACT_ENDPOINT = 'https://aidenlab-contact-relay.agentkang0331.workers.dev';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const { tx } = useT();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus('submitting');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error('submission_failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return tx(
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Five required fields up front; everything that only sharpens the
          diagnosis is optional and folded away, so the form never looks long. */}
      <div className="field">
        <label htmlFor="service">
          관심 서비스 <span className="req" aria-hidden="true">*</span>
        </label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>서비스를 선택해주세요</option>
          <option value="일본 Qoo10 1위 만들기 (Japan Growth Plan)">일본 Qoo10 1위 만들기 (Japan Growth Plan)</option>
          <option value="런칭 6개월 1억 만들기 (Launch Booster)">런칭 6개월 1억 만들기 (Launch Booster)</option>
          <option value="글로벌 인플루언서 마케팅">글로벌 인플루언서 마케팅</option>
          <option value="퍼포먼스 마케팅">퍼포먼스 마케팅</option>
          <option value="이커머스 운영대행">이커머스 운영대행</option>
          <option value="국내·일본 유통 입점">국내·일본 유통 입점</option>
          <option value="わさび10 (B2B)">わさび10 (B2B)</option>
          <option value="기타 / 일반 문의">기타 / 일반 문의</option>
        </select>
      </div>

      <div className="field field-row">
        <div>
          <label htmlFor="company">
            회사명 / 브랜드명 <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="company" name="company" placeholder="예: aidenlab" autoComplete="organization" required />
        </div>
        <div>
          <label htmlFor="contact_name">
            담당자명 <span className="req" aria-hidden="true">*</span>
          </label>
          <input id="contact_name" name="contact_name" placeholder="홍길동" autoComplete="name" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">
          이메일 <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" placeholder="hello@brand.com" autoComplete="email" required />
      </div>

      <div className="field">
        <label htmlFor="message">
          문의 내용 <span className="req" aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="message" placeholder="진행하고 싶은 시장, 일정, 예산 등을 자유롭게 적어주세요." required></textarea>
      </div>

      <details className="field-more">
        <summary>브랜드 정보를 더 주시면 진단이 정확해집니다 (선택)</summary>

        <div className="field field-row">
          <div>
            <label htmlFor="phone">전화번호</label>
            <input id="phone" name="phone" type="tel" placeholder="010-0000-0000" autoComplete="tel" />
          </div>
          <div>
            <label htmlFor="position">직책</label>
            <input id="position" name="position" placeholder="마케팅 매니저" autoComplete="organization-title" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="revenue">월매출 / 카테고리</label>
          <select id="revenue" name="revenue" defaultValue="">
            <option value="" disabled>현재 단계를 선택해주세요</option>
            <option value="월 1천만 미만 / 런칭 준비중">월 1천만 미만 / 런칭 준비중</option>
            <option value="월 1천~5천만원">월 1천~5천만원</option>
            <option value="월 5천만~3억원">월 5천만~3억원</option>
            <option value="월 3억 이상">월 3억 이상</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="brand_file">브랜드 자료 (선택)</label>
          <input id="brand_file" name="brand_file" type="file" accept=".pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx,.zip,image/*" />
          <p className="field-help">회사소개서·브랜드 자료 등, 최대 25MB</p>
        </div>
      </details>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="_gotcha">이 칸은 비워두세요</label>
        <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="privacy-check">
        <input type="checkbox" required />
        <span>상담 연락을 위한 개인정보 수집·이용에 동의합니다.</span>
      </label>

      <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? '전송 중…' : '무료 진단 신청'}
        {status !== 'submitting' && <span className="arr" aria-hidden="true">→</span>}
      </button>

      <div className={`form-status ${status}`} role="status" aria-live="polite">
        {status === 'success' && '신청이 완료됐습니다. 1영업일 이내에 담당자가 연락드리겠습니다.'}
        {status === 'error' && '전송에 실패했습니다. 잠시 후 다시 시도하거나 admin@aidenlab.io로 문의해주세요.'}
      </div>
    </form>
  );
}
