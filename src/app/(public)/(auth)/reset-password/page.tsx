'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Loader, Alert, Image } from 'nemea-ui';
import { Eye, EyeSlash, Password } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

import { resetPassword } from '@/services/authorization/auth';

import { cn } from '@/utils/cn';

import Logo from '@/components/ui/Logo';
import { Form } from '@/components/ui/Form';

import winnersIllustration from '@/assets/images/winners.svg';
import { useSearchParams } from 'next/navigation';

const formSchema = z
  .object({
    new_password: z.string().min(1, {
      message: 'Este campo é de preenchimento obrigatório',
    }),
    confirm_password: z.string().min(1, {
      message: 'Este campo é de preenchimento obrigatório',
    }),
  })
  .refine((schema) => schema.confirm_password === schema.new_password, {
    message: 'As senhas não conferem',
    path: ['confirm_password'],
  });

export default function Login() {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });

  const [sended, setSended] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    isPending: isLoading,
    mutate: handleResetPassword,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => setSended(true),
  });

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    const { new_password } = data;
    handleResetPassword({
      password: new_password,
      token: searchParams.get('token'),
    });
  };

  return (
    <>
      <div className={cn('w-full h-full flex items-center justify-center p-4')}>
        <div className="bg-light dark:bg-grayscale-900 rounded-lg flex shadow-sm">
          <div className="p-8 max-w-md">
            {sended && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="w-max rounded-lg p-4">
                  <Image
                    src={winnersIllustration.src}
                    alt="Senha redefinida"
                    className="w-32"
                  />
                </div>
                <h2 className="text-3xl font-bold text-center mt-4">
                  Sua senha foi redefinida!
                </h2>
                <p className="text-gray-500 text-center">
                  Faça login com sua nova senha para acessar a plataforma!
                </p>
                <Button.Root
                  asChild
                  theme="primary"
                  size="lg"
                  className="w-full mt-8"
                >
                  <Link href="/login">Voltar para o login</Link>
                </Button.Root>
              </div>
            )}

            {!sended && (
              <>
                <Logo className="w-32 my-0 mx-auto lg:mx-0" />
                <header className="my-16">
                  <h2 className="text-3xl font-bold mb-2 text-center lg:text-start">
                    Redefina sua senha
                  </h2>
                  <p className="text-gray-500 text-center lg:text-start">
                    Crie uma nova senha de acesso à plataforma
                  </p>
                </header>
                <Form.Root {...form}>
                  <form onSubmit={form.handleSubmit(handleSave)}>
                    {isError && (
                      <Alert.Root theme="failure" className="mb-8">
                        <Alert.Content>
                          <Alert.Description>
                            {(error as Error).message}
                          </Alert.Description>
                        </Alert.Content>
                      </Alert.Root>
                    )}

                    <Form.Field
                      control={form.control}
                      name="new_password"
                      render={({ field }) => (
                        <Form.Item className="mb-4">
                          <Form.Label>Nova senha</Form.Label>
                          <Form.Control>
                            <Input
                              placeholder="Digite sua nova senha"
                              icon={
                                <Password
                                  className="text-primary-500"
                                  weight="bold"
                                />
                              }
                              theme="gray"
                              size="lg"
                              type={showNewPassword ? 'text' : 'password'}
                              actions={
                                <Button.Root
                                  className="p-0"
                                  theme="linkPrimary"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  type="button"
                                >
                                  <Button.Label>
                                    {showNewPassword ? (
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

                    <Form.Field
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <Form.Item className="mb-4">
                          <Form.Label>Confirmação de senha</Form.Label>
                          <Form.Control>
                            <Input
                              placeholder="Confirme sua nova senha"
                              icon={
                                <Password
                                  className="text-primary-500"
                                  weight="bold"
                                />
                              }
                              theme="gray"
                              size="lg"
                              type={showConfirmPassword ? 'text' : 'password'}
                              actions={
                                <Button.Root
                                  className="p-0"
                                  theme="linkPrimary"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  type="button"
                                >
                                  <Button.Label>
                                    {showConfirmPassword ? (
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
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader size="sm" color="white" />
                      ) : (
                        <Button.Label>Salvar</Button.Label>
                      )}
                    </Button.Root>
                  </form>
                </Form.Root>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
