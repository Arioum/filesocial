'use client';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { AlertCard } from './AlertCard';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().max(50),
});

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/login`, {
        formData: values,
      });

      if (res.data) {
        const { token, user } = res.data;
        login(token, user);
        navigate('/app');
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      console.error('Login failed:', err);
    }
  }

  return (
    <Form {...form}>
      {errorMessage && <AlertCard title={errorMessage} />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[350px] flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter you Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Password must contain at least 8 characters, one special character, one number, and one uppercase letter.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
