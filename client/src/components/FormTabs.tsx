import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

const FormTabs = () => {
  return (
    <Tabs
      defaultValue='login'
      className='w-[400px] flex flex-col gap-[1em] items-center'
    >
      <TabsList>
        <TabsTrigger value='login'>Login</TabsTrigger>
        <TabsTrigger value='register'>Register</TabsTrigger>
      </TabsList>
      <TabsContent
        value='login'
        className='flex flex-col gap-[2em] items-center'
      >
        <div className='flex flex-col gap-2 items-center'>
          <LoginForm />
        </div>
      </TabsContent>
      <TabsContent
        value='register'
        className='flex flex-col gap-[2em] items-center mt-[-1em]'
      >
        <div className='flex flex-col gap-2 items-center'>
          <RegisterForm />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FormTabs;
