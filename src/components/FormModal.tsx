import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { FormData } from '../types/form';
import { useForm } from '../hooks/useForm';

interface FormModalProps {
  isOpen: boolean;
  onClose: (data?: FormData) => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const { formData, handleInputChange } = useForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 제목으로 포커스 이동
    if (titleRef.current) {
      titleRef.current.focus();
    }

    // ESC 키 핸들링
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(); // 취소로 닫기
      }
    };

    // 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(formData); // 데이터와 함께 닫기
  };

  const handleCancel = () => {
    onClose(); // 데이터 없이 닫기
  };

  // 오버레이 클릭 핸들링
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // 취소로 닫기
    }
  };

  if (!isOpen) return null;

  return createPortal(
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

          <form onSubmit={handleSubmit}>
            <div className='mb-5'>
              <label
                htmlFor='name'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                이름 / 닉네임
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
              />
            </div>

            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                이메일
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
              />
            </div>

            <div className='mb-5'>
              <label
                htmlFor='experience'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                FE 경력 연차
              </label>
              <select
                id='experience'
                name='experience'
                value={formData.experience}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none bg-white cursor-pointer transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
              >
                <option value='선택해주세요'>선택해주세요</option>
                <option value='0-3년'>0-3년</option>
                <option value='4-7년'>4-7년</option>
                <option value='8년 이상'>8년 이상</option>
              </select>
            </div>

            <div className='mb-8'>
              <label
                htmlFor='github'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                GitHub 링크 (선택)
              </label>
              <input
                type='url'
                id='github'
                name='github'
                value={formData.github}
                onChange={handleInputChange}
                placeholder='https://github.com/username'
                className='w-full px-4 py-3 border-2 border-indigo-500 rounded-lg text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
              />
            </div>

            <div className='flex gap-3 justify-end'>
              <button
                type='button'
                onClick={handleCancel}
                className='px-6 py-3 border-none rounded-lg text-sm font-semibold cursor-pointer bg-gray-100 text-gray-700 transition-colors duration-200 hover:bg-gray-200'
              >
                취소
              </button>
              <button
                type='submit'
                className='px-6 py-3 border-none rounded-lg text-sm font-semibold cursor-pointer bg-indigo-500 text-white transition-colors duration-200 hover:bg-indigo-600'
              >
                제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
