import { useState } from 'react';
import type { FormData } from '../types/form';

const initialFormData: FormData = {
  name: '',
  email: '',
  experience: '선택해주세요',
  github: '',
};

export function useForm(initialData: FormData = initialFormData) {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleInputChange,
    resetForm,
  };
}
