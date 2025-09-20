import { z } from 'zod';
import { formSchema } from '../api/schema/formSchema';

export type FormData = z.infer<typeof formSchema>;
