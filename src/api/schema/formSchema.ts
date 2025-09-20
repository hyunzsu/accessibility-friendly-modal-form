import { z } from 'zod';

/**
 * 신청 폼 스키마
 * 이메일과 FE 경력 연차 등 기본 정보를 검증합니다.
 */
export const formSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(50, '이름은 50자 이내로 입력해주세요.'),
    
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
    
  experience: z
    .string()
    .refine(
      (value) => value !== '선택해주세요',
      'FE 경력 연차를 선택해주세요.'
    ),
    
  github: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value || value.trim() === '') return true;
        try {
          const url = new URL(value);
          return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
          return false;
        }
      },
      '올바른 URL 형식을 입력해주세요.'
    )
    .transform((value) => value || ''), // 빈 문자열로 변환
});

// 기본값
export const defaultFormValues = {
  name: '',
  email: '',
  experience: '선택해주세요',
  github: '',
} as const;
