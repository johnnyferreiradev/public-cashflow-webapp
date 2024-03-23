'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Image, Input, Toaster, Loader } from 'nemea-ui';
import { At, Password, Eye, EyeSlash, Warning } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils/cn';

import Logo from '@/components/ui/Logo';
import { Form } from '@/components/ui/Form';

import loginIllustration from '@/assets/images/login-illustration.svg';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
  password: z.string().min(1, {
    message: 'Este campo é de preenchimento obrigatório',
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [toasterError, setToasterError] = useState({
    title: '',
    description: '',
    show: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const result = await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/dashboard');
      return;
    }

    setLoading(false);

    if (result?.status === 401) {
      setToasterError({
        title: 'E-mail e/ou senha incorretos',
        description: '',
        show: true,
      });
      return;
    }

    setToasterError({
      title: 'Ocorreu um erro inesperado ao fazer login.',
      description:
        'Tente novamente mais tarde ou, se o erro persistir, contacte o suporte.',
      show: true,
    });
  };

  return (
    <>
      <div className={cn('w-full h-full flex items-center justify-center p-4')}>
        <div className="bg-light dark:bg-grayscale-900 rounded-lg flex shadow-sm">
          <Toaster.Root
            open={toasterError.show}
            theme="failure"
            onOpenChange={() =>
              setToasterError({
                ...toasterError,
                show: false,
              })
            }
          >
            <Toaster.Icon>
              <Warning />
            </Toaster.Icon>
            <Toaster.Content>
              <Toaster.Title
                className={!toasterError.description ? 'mb-0' : ''}
              >
                {toasterError.title}
              </Toaster.Title>
              {toasterError.description && (
                <Toaster.Description>
                  {toasterError.description}
                </Toaster.Description>
              )}
            </Toaster.Content>
            <Toaster.Close />
          </Toaster.Root>

          <div className="p-8 max-w-md">
            <Logo className="w-32 my-0 mx-auto lg:mx-0" />
            <header className="my-16">
              <h2 className="text-3xl font-bold mb-2 text-center lg:text-start">
                Bem-vindo de volta ao{' '}
                <span className="text-primary-500">Cashflow</span>!
              </h2>
              <p className="text-gray-500 text-center lg:text-start">
                Faça login para acessar o sistema
              </p>
            </header>
            <Form.Root {...form}>
              <form onSubmit={form.handleSubmit(handleSave)}>
                <Form.Field
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Form.Item className="mb-4">
                      <Form.Label>Nome de usuário</Form.Label>
                      <Form.Control>
                        <Input
                          placeholder="Nome de usuário"
                          icon={
                            <At className="text-primary-500" weight="bold" />
                          }
                          theme="gray"
                          size="lg"
                          {...field}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Form.Field
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Form.Item className="mb-4">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control>
                        <Input
                          placeholder="Digite sua senha"
                          icon={
                            <Password
                              className="text-primary-500"
                              weight="bold"
                            />
                          }
                          theme="gray"
                          size="lg"
                          type={showPassword ? 'text' : 'password'}
                          actions={
                            <Button.Root
                              className="p-0"
                              theme="linkPrimary"
                              onClick={() => setShowPassword(!showPassword)}
                              type="button"
                            >
                              <Button.Label>
                                {showPassword ? (
                                  <EyeSlash
                                    className="text-primary-500"
                                    weight="bold"
                                    size={18}
                                  />
                                ) : (
                                  <Eye
                                    className="text-primary-500"
                                    weight="bold"
                                    size={18}
                                  />
                                )}
                              </Button.Label>
                            </Button.Root>
                          }
                          {...field}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Button.Root
                  theme="primary"
                  size="lg"
                  className="mt-8 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader size="sm" color="white" />
                  ) : (
                    <Button.Label>Entrar</Button.Label>
                  )}
                </Button.Root>
              </form>
            </Form.Root>

            <Button.Root theme="linkPrimary" className="p-0 mt-8 mb-4">
              <Link href="/recovery-password">Esqueceu sua senha?</Link>
            </Button.Root>
          </div>
          <div
            className={twMerge(
              'min-h-fit flex-col w-full min-w-[580px] bg-primary-500 dark:bg-grayscale-800/50 m-4 rounded-md',
              'justify-center items-center flex',
              'hidden lg:!flex',
            )}
          >
            <Image
              src={loginIllustration.src}
              alt="Cashflow illustration"
              className="w-64 mb-12"
            />
            <h3 className="text-xl w-80 font-bold text-light text-center mb-2">
              Controle financeiro simplificado para seu negócio
            </h3>
            <p className="text-sm font-bold text-primary-200 w-80 text-center">
              Acompanhe receitas, despesas e lucros em um só lugar.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
