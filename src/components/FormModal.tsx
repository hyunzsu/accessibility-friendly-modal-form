import { useEffect, useRef } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, defaultFormValues } from '../api/schema/formSchema';
import type { FormData } from '../types/form';

interface FormModalProps {
  isOpen: boolean;
  onClose: (data?: FormData) => void;
}

// focusable 요소 찾기
const getFocusableElements = (container: HTMLElement): NodeListOf<HTMLElement> => {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
};

// 폼 콘텐츠 컴포넌트
function FormContent({ onClose }: { onClose: (data?: FormData) => void }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setFocus 
  } = useFormContext<FormData>();

  // 첫 번째 오류 필드로 포커스 이동
  const focusFirstErrorField = () => {
    const errorFields = Object.keys(errors) as Array<keyof FormData>;
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      setFocus(firstErrorField);
    }
  };

  // 폼 제출 핸들러
  const onSubmit = handleSubmit(
    // 성공 시
    async (data: FormData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      onClose(data);
    },
    // 실패 시
    () => {
      setTimeout(focusFirstErrorField, 100);
    }
  );

  const handleCancel = () => {
    onClose();
  };

  // 첫 번째 오류 메시지 (스크린리더용)
  const firstErrorMessage = Object.values(errors)[0]?.message;

  return (
    <>
      {/* 스크린리더용 live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {firstErrorMessage}
      </div>

      <form onSubmit={onSubmit}>
        {/* 이름 필드 */}
        <div className='mb-5'>
          <label htmlFor='name' className='block text-sm font-semibold text-gray-700 mb-2'>
            이름 / 닉네임 <span className="text-red-500">*</span>
          </label>
          <input
            type='text'
            id='name'
            {...register('name')}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-indigo-500'
            }`}
          />
          {errors.name && (
            <div id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </div>
          )}
        </div>

        {/* 이메일 필드 */}
        <div className='mb-5'>
          <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
              errors.email 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-indigo-500'
            }`}
          />
          {errors.email && (
            <div id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </div>
          )}
        </div>

        {/* 경력 필드 */}
        <div className='mb-5'>
          <label htmlFor='experience' className='block text-sm font-semibold text-gray-700 mb-2'>
            FE 경력 연차 <span className="text-red-500">*</span>
          </label>
          <select
            id='experience'
            {...register('experience')}
            aria-describedby={errors.experience ? 'experience-error experience-help' : 'experience-help'}
            aria-invalid={!!errors.experience}
            className={`w-full px-4 py-3 border rounded-lg text-sm outline-none bg-white cursor-pointer transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
              errors.experience 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-indigo-500'
            }`}
          >
            <option value='선택해주세요'>선택해주세요</option>
            <option value='0-3년'>0-3년</option>
            <option value='4-7년'>4-7년</option>
            <option value='8년 이상'>8년 이상</option>
          </select>
          
          <div id="experience-help" className="mt-1 text-xs text-gray-500">
            화살표 키로 선택, Enter로 확정
          </div>
          
          {errors.experience && (
            <div id="experience-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.experience.message}
            </div>
          )}
        </div>

        {/* GitHub 필드 */}
        <div className='mb-8'>
          <label htmlFor='github' className='block text-sm font-semibold text-gray-700 mb-2'>
            GitHub 링크 (선택)
          </label>
          <input
            type='url'
            id='github'
            {...register('github')}
            placeholder='https://github.com/username'
            aria-describedby={errors.github ? 'github-error' : undefined}
            aria-invalid={!!errors.github}
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
              errors.github 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-indigo-500 focus:border-indigo-500'
            }`}
          />
          {errors.github && (
            <div id="github-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.github.message}
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className='flex gap-3 justify-end'>
          <button
            type='button'
            onClick={handleCancel}
            disabled={isSubmitting}
            className='px-6 py-3 border-none rounded-lg text-sm font-semibold cursor-pointer bg-gray-100 text-gray-700 transition-colors duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            취소
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-6 py-3 border-none rounded-lg text-sm font-semibold cursor-pointer bg-indigo-500 text-white transition-colors duration-200 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </form>
    </>
  );
}

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
