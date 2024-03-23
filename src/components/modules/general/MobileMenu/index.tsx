import { useState } from 'react';
import { Sheet } from 'nemea-ui';
import { signOut } from 'next-auth/react';
import { Gear, Question, SignOut } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

import ShortMenuButton from '../ShortMenu/components/ShortMenuButton';
import { MenuOptions } from '../ModuleMenu';
import SettingsModal from '../SettingsModal';

import { MobileMenuProps } from './types';
import FAQModal from '../FAQModal';

export default function MobileMenu({
  className = '',
  id,
  onClose,
  open,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [FAQIsOpen, setFAQIsOpen] = useState(false);

  return (
    <Sheet.Root
      open={open}
      className={cn(className)}
      id={id}
      contentClassName="flex flex-col justify-between"
      onInteractOutside={onClose}
    >
      <Sheet.CloseButton onClose={onClose} />
      <div>
        <Sheet.Title>Fluxo de caixa</Sheet.Title>
        <MenuOptions
          pathname={pathname}
          onOptionClick={onClose}
          className="items-center w-full mt-16"
        />
      </div>
      <footer className="flex items-center gap-4 justify-center">
        <SettingsModal
          open={settingsIsOpen}
          onClose={() => setSettingsIsOpen(false)}
        />

        <ShortMenuButton
          onClick={() => setSettingsIsOpen(true)}
          icon={<Gear size={32} />}
          tooltipMessage="Configurações"
          active={false}
          tooltipSide="top"
        />

        <FAQModal open={FAQIsOpen} onClose={() => setFAQIsOpen(false)} />

        <ShortMenuButton
          onClick={() => setFAQIsOpen(true)}
          icon={<Question size={32} />}
          tooltipMessage="Ajuda"
          active={false}
          tooltipSide="top"
        />

        <ShortMenuButton
          icon={<SignOut size={32} />}
          tooltipMessage="Sair"
          active={false}
          onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
          tooltipSide="top"
        />
      </footer>
    </Sheet.Root>
  );
}
