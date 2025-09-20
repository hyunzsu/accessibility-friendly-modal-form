import { overlay } from 'overlay-kit';
import FormModal from '../components/FormModal';
import type { FormData } from '../types/form';

/**
 * 선언적 모달 API 훅
 * overlay-kit을 사용한 Promise 기반 모달 호출
 */
export function useFormModal() {
  const openFormModal = (): Promise<FormData | null> => {
    return new Promise((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <FormModal
          isOpen={isOpen}
          onClose={(data) => {
            resolve(data || null);
            close();
          }}
        />
      ));
    });
  };

  return { openFormModal };
}
