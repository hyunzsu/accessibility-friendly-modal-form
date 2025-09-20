import { useState } from 'react';
import { useFormModal } from '../hooks/useFormModal';

export default function ModalFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { openFormModal } = useFormModal();

  const handleOpenModal = async () => {
    setIsLoading(true);

    try {
      const result = await openFormModal();

      if (result) {
        console.log('폼 제출 완료:', result);
        // 여기서 서버로 데이터 전송 등 처리
      } else {
        console.log('폼 취소됨');
      }
    } catch (error) {
      console.error('모달 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-5'>
      <div className='text-center max-w-md mx-auto space-y-8'>
        <button
          onClick={handleOpenModal}
          disabled={isLoading}
          className='bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
        >
          {isLoading ? '처리 중...' : '🚀 신청 폼 작성하기'}
        </button>
      </div>
    </div>
  );
}
