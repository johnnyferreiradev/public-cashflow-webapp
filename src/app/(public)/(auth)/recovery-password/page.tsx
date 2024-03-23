'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input, Loader, Alert, Image } from 'nemea-ui';
import { ArrowLeft, At } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { recoveryPassword } from '@/services/authorization/auth';

import { cn } from '@/utils/cn';

import { Form } from '@/components/ui/Form';

import mailSendIllustration from '@/assets/images/mail-sent.svg';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Este campo é de preenchimento obrigatório',
    })
    .email('Insira um e-mail válido'),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const [sended, setSended] = useState(false);

  const {
    mutate: handleRecoveyPassword,
    isError,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: recoveryPassword,
    onSuccess: () => setSended(true),
  });

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    handleRecoveyPassword(data.email);
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
                    src={mailSendIllustration.src}
                    alt="E-mail enviado"
                    className="w-32"
                  />
                </div>
                <h2 className="text-3xl font-bold text-center mt-4">
                  Verifique seu e-mail!
                </h2>
                <p className="text-gray-500 text-center">
                  Um link de recuperação de senha foi enviado para o endereço de
                  email vinculado à sua conta. Para redefinir sua senha, siga as
                  instruções no email que você recebeu.
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
                <Button.Root
                  asChild
                  size="sm"
                  theme="linkPrimary"
                  className="max-w-max mb-16"
                >
                  <Link href="/login">
                    <Button.Icon>
                      <ArrowLeft />
                    </Button.Icon>
                    <Button.Label>Voltar para o login</Button.Label>
                  </Link>
                </Button.Root>
                <header className="my-16">
                  <h2 className="text-3xl font-bold mb-2 text-center lg:text-start">
                    Esqueceu sua senha?
                  </h2>
                  <p className="text-gray-500 text-center lg:text-start">
                    Não se preocupe, iremos te enviar as instruções para
                    recuperação.
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
                      name="email"
                      render={({ field }) => (
                        <Form.Item className="mb-4">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control>
                            <Input
                              placeholder="Digite seu e-mail"
                              icon={
                                <At
                                  className="text-primary-500"
                                  weight="bold"
                                />
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

                    <Button.Root
                      theme="primary"
                      size="lg"
                      className="mt-8 w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader size="sm" color="white" />
                      ) : (
                        <Button.Label>Enviar</Button.Label>
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
