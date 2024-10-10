'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCard } from './AlertCard';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .max(50)
      .regex(passwordRegex, {
        message:
          'Password must contain at least one special character, one number, and one uppercase letter.',
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken-fileSocial');
    if (token) {
      navigate('/app');
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/auth/register',
        {
          formData: values,
        }
      );
      const jwtToken = res.data.token;
      if (jwtToken) {
        localStorage.setItem('jwtToken-fileSocial', jwtToken);
        navigate('/app');
      }
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      console.error('Registration failed:', err);
    }
  }

  return (
    <Form {...form}>
      {errorMessage && <AlertCard title={errorMessage} />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-[350px] flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormDescription className='text-[.75rem]'>
                Password must contain at least 8 characters, one special
                character, one number, and one uppercase letter.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
