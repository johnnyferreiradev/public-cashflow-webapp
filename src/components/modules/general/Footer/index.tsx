import { cn } from '@/utils/cn';

import { APP_NAME, APP_VERSION } from '@/settings';

import { FooterProps } from './types';

export default function Footer({ className = '', id }: FooterProps) {
  return (
    <footer
      className={cn('text-xs text-center text-grayscale-400', className)}
      id={id}
    >
      <p>
        {APP_NAME} {APP_VERSION} por Johnny Ferreira
      </p>
      <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
    </footer>
  );
}
