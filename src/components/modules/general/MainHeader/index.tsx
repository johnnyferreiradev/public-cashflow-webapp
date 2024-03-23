'use client';

import { useState } from 'react';
import { Avatar, Button, Dropdown, Skeleton } from 'nemea-ui';
import { List } from '@phosphor-icons/react';
import Link from 'next/link';

import { useUserStore } from '@/store/userStore';

import { cn } from '@/utils/cn';

import MobileMenu from '../MobileMenu';
import Logo from '@/components/ui/Logo';

import { MainHeaderProps } from './types';

export default function MainHeader({ className = '', id }: MainHeaderProps) {
  const {
    company: { name = '' },
    username,
    firstName,
    lastName,
    email,
  } = useUserStore();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header
      className={cn(
        'w-full px-3 md:!px-8 bg-light dark:bg-grayscale-900 border-l border-gray-50 dark:border-gray-800',
        'shadow-sm overflow-x-hidden z-10 dark:shadow-dark flex items-center justify-between h-16 min-h-[64px]',
        className,
      )}
      id={id}
    >
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Logo className="w-16 block md:!hidden" />
        </Link>
        {name ? (
          <h3 className="font-medium pl-0">{name}</h3>
        ) : (
          <Skeleton width="200px" height="16px" />
        )}
      </div>
      <div className="flex items-center gap-4">
        {username && (
          <Dropdown.Root
            trigger={
              <Avatar.Root>
                <Avatar.Fallback>{`${username[0].toUpperCase()}${username[1].toUpperCase()}`}</Avatar.Fallback>
              </Avatar.Root>
            }
            className="z-40"
          >
            <Dropdown.Arrow />
            <div className="p-2">
              <h4 className="font-semibold text-lg">
                {firstName} {lastName}
              </h4>
              <p className="text-primary-600 dark:text-primary-400">
                {username}
              </p>
              <Dropdown.Separator />
              <p className="text-grayscale-400">{email}</p>
            </div>
          </Dropdown.Root>
        )}
        <Button.Root
          onClick={() => setMenuIsOpen(true)}
          className="w-8 h-8 flex xl:!hidden"
        >
          <Button.Label>
            <List weight="bold" size={24} />
          </Button.Label>
        </Button.Root>
      </div>

      <MobileMenu open={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
    </header>
  );
}
