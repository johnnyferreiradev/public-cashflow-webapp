import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { Form } from '@/components/ui/Form';

import useAuthUser from '@/hooks/useAuthUser';

import {
  MyAccountFormSchema,
  MyAccountSettingsProps,
  myAccountFormSchema,
} from './types';
import { Alert, Input, Separator } from 'nemea-ui';

export default function MyAccountSettings({
  className = '',
  id,
}: MyAccountSettingsProps) {
  const { username, firstName, lastName, email } = useAuthUser();

  const form = useForm<MyAccountFormSchema>({
    resolver: zodResolver(myAccountFormSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  return (
    <div className={cn('pt-8 md:pt-0', className)} id={id}>
      <Alert.Root className="mb-8">
        <Alert.Content>
          <Alert.Description>
            Você poderá editar as informações do perfil em breve
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <div>
        <p className="text-sm text-grayscale-400">Nome de usuário</p>
        <p>{username}</p>
      </div>

      <Separator className="my-2" />

      <Form.Root {...form}>
        <form
          onSubmit={form.handleSubmit(() => undefined)}
          className="flex flex-col gap-5 mt-4 h-full"
        >
          <div className="flex gap-4 flex-1">
            <Form.Field
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label className="text-xs">Nome</Form.Label>
                  <Form.Control>
                    <Input
                      placeholder="John"
                      theme="gray"
                      size="xs"
                      className="w-full max-w-[160px]"
                      {...field}
                      disabled
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label className="text-xs">Sobrenome</Form.Label>
                  <Form.Control>
                    <Input
                      placeholder="Doe"
                      theme="gray"
                      size="xs"
                      className="w-full max-w-[160px]"
                      {...field}
                      disabled
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>
        </form>
      </Form.Root>

      <div className="mt-8">
        <h3 className="font-medium text-sm">Segurança da conta</h3>
        <div className="my-4">
          <div>
            <p className="text-sm text-grayscale-400">E-mail</p>
            <p>{email}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="my-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-grayscale-400">Senha</p>
            <p>Alterar senha</p>
          </div>
          <p className="text-grayscale-400 text-sm italic">Em breve...</p>
        </div>
      </div>
    </div>
  );
}
