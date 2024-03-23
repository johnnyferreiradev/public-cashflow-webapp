import { Modal, Tabs } from 'nemea-ui';

import { cn } from '@/utils/cn';

import { SettingsModalProps } from './types';
import { Palette, UserCircle } from '@phosphor-icons/react';
import MyAccountSettings from './components/MyAccountSettings';
import AppearenceSettings from './components/AppearenceSettings';

export default function SettingsModal({
  className = '',
  id,
  onClose,
  open,
}: SettingsModalProps) {
  return (
    <Modal.Root
      className={cn(className)}
      id={id}
      open={open}
      contentClassName="min-w-full md:min-w-[728px]"
    >
      <Modal.CloseButton onClose={onClose} />
      <Modal.Title className="mb-1">Configurações</Modal.Title>
      <Modal.Description>Configurações gerais da aplicação</Modal.Description>
      <div className="mt-8">
        <Tabs.Root
          orientation="horizontal"
          defaultValue="my-account"
          className="flex flex-col md:!flex-row"
        >
          <Tabs.List
            theme="default"
            className={cn(
              'min-w-[160px] p-0 pr-2 rounded-none',
              'border-0 md:!border-r border-r-grayscale-100 dark:border-r-grayscale-800',
              'min-h-max md:!min-h-[260px]',
              '!flex !flex-row md:!flex-col',
            )}
          >
            <Tabs.Trigger
              value="my-account"
              className="text-left flex items-center gap-1"
            >
              <UserCircle size={18} />
              <p>Minha conta</p>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="appearence"
              className="text-left flex items-center gap-1"
            >
              <Palette size={18} />
              Aparência
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="my-account"
            className="w-full p-0 md:!px-4 md:!py-2"
          >
            <MyAccountSettings />
          </Tabs.Content>
          <Tabs.Content
            value="appearence"
            className="w-full p-0 md:!px-4 md:!py-2"
          >
            <AppearenceSettings />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Modal.Root>
  );
}
