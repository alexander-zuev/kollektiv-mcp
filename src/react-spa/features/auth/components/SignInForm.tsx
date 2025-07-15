import { Button } from '@/components/ui/atoms/buttons';
import { Input } from '@/components/ui/atoms/inputs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/data/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Email validation schema
const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Input a non-empty email address')
    .email('Please enter a valid email address'),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

interface EmailFormProps {
  onSubmit: (data: EmailFormValues) => void;
  isLoading?: boolean;
  className?: string;
}

export function SignInForm({ onSubmit, isLoading = false, className }: EmailFormProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit', // This ensures validation runs on submit
  });

  const handleSubmit = useCallback(
    (data: EmailFormValues) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-4 ${className}`}
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
