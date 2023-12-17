import { z } from 'zod';
import { DeleteCardSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { Card } from '@prisma/client';

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
