import { Collapsible, Modal } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { FAQModalProps } from './types';

export default function FAQModal({
  className = '',
  id,
  onClose,
  open,
}: FAQModalProps) {
  return (
    <Modal.Root
      className={cn(className)}
      id={id}
      open={open}
      contentClassName="min-w-full md:min-w-[728px]"
    >
      <Modal.CloseButton onClose={onClose} />
      <Modal.Title>FAQs</Modal.Title>
      <div className="mt-8 h-[500px] overflow-y-auto default-scroll pr-4">
        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Como começar a usar o sistema de fluxo de caixa?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Para começar, crie um novo caixa e marque-o como ativo no formulário
            de cadastro. Utilize o switch com a opção "Definir este caixa como
            ativo".
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Posso criar múltiplos fluxos de caixa simultâneos?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Sim, é possível criar vários fluxos de caixa, mas apenas um pode ser
            ativo por vez. Você pode alternar entre eles conforme necessário.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">Como ativar um caixa criado?</h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Acesse o menu "Meus caixas", clique nas ações do caixa desejado e
            selecione "Ativar" para torná-lo ativo.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              O que é necessário para cadastrar um caixa?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Ao cadastrar um caixa, insira uma descrição e um valor de saldo
            inicial.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              É possível cadastrar várias categorias de transações?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Sim, você pode cadastrar várias categorias de transações de entrada
            e saída para uma organização mais detalhada.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Existe limite para o número de categorias cadastradas?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Não, não há limite para o cadastro de categorias.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Como cadastrar uma nova transação diária?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Clique em "Abrir Caixa" no dashboard ou na tela de listagem de
            fluxos de caixas. Isso o levará à tela de cadastro de transações.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              É possível editar ou excluir transações?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Sim, é possível editar transações, mas os campos editáveis são
            apenas o nome e descrição. Não é possível excluir uma transação.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              O sistema permite visualizar transações de dias futuros?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Até o momento, a aplicação não permite visualizar transações de dias
            futuros.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">O que é exibido no dashboard?</h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            O dashboard apresenta informações como total de entradas, saídas,
            saldo, gráficos dos últimos 12 meses, últimas 10 transações, e mais.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Existe uma funcionalidade para exportar dados?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Atualmente, a aplicação ainda não oferece uma funcionalidade de
            exportação de dados.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              É possível configurar alertas para transações específicas?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Essa funcionalidade ainda não está disponível, mas está nos planos
            de desenvolvimento.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Existe um limite para o histórico de transações?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Não há um limite específico para o histórico de transações.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              A aplicação suporta integrações com outras ferramentas
              financeiras?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Até o momento, a aplicação ainda não suporta integrações externas.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Há uma funcionalidade de backup ou recuperação de dados?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            A aplicação atualmente não possui uma funcionalidade específica de
            backup. Recomenda-se fazer backups manuais periodicamente.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Qual é a política de segurança adotada?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            A implementação de políticas de segurança está em consideração, mas
            ainda não foi totalmente implementada.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Como entrar em contato com o suporte?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Utilize o CRISP, um chat bot posicionado no canto inferior direito
            do aplicativo.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className="mb-6">
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Existem taxas associadas ao uso contínuo?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            Até o momento, todas as funcionalidades iniciais da versão beta são
            gratuitas.
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root>
          <Collapsible.Header className="mb-4">
            <h3 className="font-bold text-lg">
              Existem tutoriais de uso disponíveis para usuários iniciantes?
            </h3>
          </Collapsible.Header>
          <Collapsible.Content className="w-full max-w-2xl mb-4">
            A aplicação ainda não oferece tutoriais de uso, mas estamos
            considerando a criação de materiais educativos.
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Modal.Root>
  );
}
