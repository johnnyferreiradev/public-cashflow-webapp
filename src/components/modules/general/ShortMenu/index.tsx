'use client';

import {
  ChartBar,
  Gear,
  Money,
  Question,
  SignOut,
  Toolbox,
} from '@phosphor-icons/react';
import { useState } from 'react';
import Link from 'next/link';

import { signOut } from 'next-auth/react';

import { cn } from '@/utils/cn';

import Logo from '@/components/ui/Logo';
import ShortMenuButton from './components/ShortMenuButton';

import { ShortMenuProps } from './types';
import SettingsModal from '../SettingsModal';
import FAQModal from '../FAQModal';

export default function ShortMenu({ className = '', id }: ShortMenuProps) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [FAQIsOpen, setFAQIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'hidden md:!flex',
        'h-screen bg-light dark:bg-grayscale-900 flex-col items-center justify-between',
        'px-2 py-6 border-r border-gray-50 dark:border-gray-800',
        className,
      )}
      id={id}
    >
      <div className="flex flex-col gap-8">
        <Link href="/dashboard">
          <Logo className="w-16 mb-2" />
        </Link>
        <nav className="flex flex-col gap-2 items-center">
          {/* <ShortMenuButton
            href="/"
            icon={<House size={28} />}
            tooltipMessage="home"
            active
          /> */}

          <ShortMenuButton
            href="/dashboard"
            icon={<Money size={32} />}
            tooltipMessage="home"
            active
          />

          <ShortMenuButton
            icon={<ChartBar size={32} />}
            tooltipMessage="home"
            active={false}
            disabled
            badge="Em breve"
          />

          <ShortMenuButton
            icon={<Toolbox size={32} />}
            tooltipMessage="home"
            active={false}
            disabled
            badge="Em breve"
          />
        </nav>
      </div>
      <footer>
        <nav className="flex flex-col gap-2 items-center">
          <SettingsModal
            open={settingsIsOpen}
            onClose={() => setSettingsIsOpen(false)}
          />

          <ShortMenuButton
            onClick={() => setSettingsIsOpen(true)}
            icon={<Gear size={32} />}
            tooltipMessage="Configurações"
            active={false}
          />

          <FAQModal open={FAQIsOpen} onClose={() => setFAQIsOpen(false)} />

          <ShortMenuButton
            onClick={() => setFAQIsOpen(true)}
            icon={<Question size={32} />}
            tooltipMessage="Ajuda"
            active={false}
          />

          <ShortMenuButton
            icon={<SignOut size={32} />}
            tooltipMessage="Sair"
            active={false}
            onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
          />
        </nav>
      </footer>
    </div>
  );
}
