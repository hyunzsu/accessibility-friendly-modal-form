import { useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, defaultFormValues } from '../api/schema/formSchema';
import type { FormData } from '../types/form';
import { FormContent } from './FormContent';

interface FormModalProps {
  isOpen: boolean;
  onClose: (data?: FormData) => void;
}

// focusable 요소 찾기
const getFocusableElements = (
  container: HTMLElement
): NodeListOf<HTMLElement> => {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
};

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // react-hook-form 설정
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (!isOpen) return;

    // 현재 포커스된 요소 저장
    previousActiveElement.current = document.activeElement as HTMLElement;

    // 모달이 열릴 때 제목으로 포커스 이동
    if (titleRef.current) {
      titleRef.current.focus();
    }

    // 키보드 이벤트 핸들링
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap 구현
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = getFocusableElements(modalRef.current);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);

      // 포커스 복귀
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // 오버레이 클릭 핸들링
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 모달 닫기 핸들러 (폼 리셋 포함)
  const handleClose = (data?: FormData) => {
    methods.reset();
    onClose(data);
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in'
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className='bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl animate-scale-in'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <h2
          id='modal-title'
          ref={titleRef}
          tabIndex={-1}
          className='text-2xl font-bold text-gray-900 mb-4 outline-none'
        >
          신청 폼
        </h2>

        <div id='modal-description'>
          <p className='text-gray-500 mb-6 text-sm leading-relaxed'>
            이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
          </p>

          <FormProvider {...methods}>
            <FormContent onClose={handleClose} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
