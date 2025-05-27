'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from './ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export function ContactForm() {
  const t = useTranslations('ContactForm');

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // 3. Render the form.
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_4fr] gap-2">
              <FormLabel className="w-max text-cyan-400">{`>> ${t('nameLabel')}:`}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('namePlaceholder')}
                  className="border-0 border-b border-cyan-800 px-0"
                  {...field}
                />
              </FormControl>
              <FormMessage
                className="col-span-2"
                translationOptions={{ namespace: 'ContactForm', errorKey: 'nameError' }}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_4fr] gap-2">
              <FormLabel className="w-max text-cyan-400">{`>> ${t('emailLabel')}:`}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('emailPlaceholder')}
                  className="border-0 border-b border-cyan-800 px-0"
                  {...field}
                />
              </FormControl>
              <FormMessage
                className="col-span-2"
                translationOptions={{ namespace: 'ContactForm', errorKey: 'emailError' }}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_4fr] gap-2">
              <FormLabel className="w-max self-start pt-[13px] text-cyan-400 md:pt-[11px]">{`>> ${t('messageLabel')}:`}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('messagePlaceholder')}
                  className="max-h-64 border-0 border-b border-cyan-800 px-0"
                  {...field}
                />
              </FormControl>
              <FormMessage
                className="col-span-2"
                translationOptions={{ namespace: 'ContactForm', errorKey: 'messageError' }}
              />
            </FormItem>
          )}
        />

        <div className="my-4 flex justify-center">
          <Button type="submit" variant="primary">
            {t('submitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
