import { useState, useRef } from 'react';
import FormModal from '../components/FormModal';
import type { FormData } from '../types/form';

export default function ModalFormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = (data?: FormData) => {
    setIsModalOpen(false);

    // 모달 닫힐 때 트리거 버튼으로 포커스 복귀
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }

    // 데이터가 있으면 제출, 없으면 취소
    if (data) {
      console.log('Form submitted:', data);
    } else {
      console.log('Form cancelled');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-5'>
      <div className='text-center'>
        <button
          ref={triggerButtonRef}
          onClick={openModal}
          className='bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40'
        >
          🚀 신청 폼 작성하기
        </button>
      </div>

      <FormModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
