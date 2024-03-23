import { usePathname } from 'next/navigation';
import { Button } from 'nemea-ui';
import Link from 'next/link';

import { cn } from '@/utils/cn';

import Footer from '../Footer';

import { ModuleMenuProps, MenuOptionsProps } from './types';

export function MenuOptions({
  pathname,
  onOptionClick,
  className = '',
  id,
}: MenuOptionsProps) {
  return (
    <nav className={cn('flex flex-col gap-1', className)} id={id}>
      <Button.Root
        theme={pathname === '/dashboard' ? 'grayPrimary' : 'darkFlat'}
        className="p-0 w-full min-w-max"
        onClick={() => onOptionClick?.(pathname)}
      >
        <Link href="/dashboard" className="w-full py-2 px-3 text-start">
          Painel Financeiro
        </Link>
      </Button.Root>
      <Button.Root
        theme={pathname === '/cash-flow-list' ? 'grayPrimary' : 'darkFlat'}
        className="p-0 w-full min-w-max"
        onClick={() => onOptionClick?.(pathname)}
      >
        <Link href="/cash-flow-list" className="w-full py-2 px-3 text-start">
          Meus caixas
        </Link>
      </Button.Root>
      <Button.Root
        theme={pathname === '/categories' ? 'grayPrimary' : 'darkFlat'}
        className="p-0 w-full min-w-max"
        onClick={() => onOptionClick?.(pathname)}
      >
        <Link href="/categories" className="w-full py-2 px-3 text-start">
          Categorias
        </Link>
      </Button.Root>
      <Button.Root
        theme={pathname === '/statistics' ? 'grayPrimary' : 'darkFlat'}
        className="p-0 w-full min-w-max m-0"
        onClick={() => onOptionClick?.(pathname)}
        disabled
      >
        {/* <Link href="/" className="w-full py-2 px-3 text-start">
          Estatísticas
        </Link> */}
        <Button.Badge className="top-0.5">Em breve</Button.Badge>
        <Button.Label className="w-full py-2 px-3 text-start m-0">
          Estatísticas
        </Button.Label>
      </Button.Root>
    </nav>
  );
}

export default function ModuleMenu({ className = '', id }: ModuleMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hidden xl:!flex relative',
        'w-60 max-w-[240px] bg-light dark:bg-grayscale-900 p-4 flex-col gap-8',
        className,
      )}
      id={id}
    >
      <h3 className="font-bold text-xl pl-3">Fluxo de caixa</h3>
      <MenuOptions pathname={pathname} />
      <Footer className="absolute bottom-5 left-1.5 max-w-full" />
    </div>
  );
}
