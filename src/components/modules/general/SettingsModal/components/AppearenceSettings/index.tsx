import { cn } from '@/utils/cn';

import { AppearenceSettingsProps } from './types';
import DarkModeSelect from '../../../DarkModeSelect';

export default function AppearenceSettings({
  className = '',
  id,
}: AppearenceSettingsProps) {
  return (
    <div className={cn('w-full pt-8 md:pt-0', className)} id={id}>
      <div className="w-full flex items-end justify-between">
        <div>
          <p className="">Tema</p>
          <p className="text-sm text-grayscale-400">
            Selecione o tema da aplicação
          </p>
        </div>
        <DarkModeSelect />
      </div>
    </div>
  );
}
