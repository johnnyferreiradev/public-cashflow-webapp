import { useEffect, useState } from 'react';
import { Select } from 'nemea-ui';
import { Moon, SunDim, Desktop } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { DarkModeSelectProps } from './types';

export default function DarkModeSelect({
  className = '',
}: DarkModeSelectProps) {
  const { systemTheme, theme, setTheme } = useTheme();

  const [themeMode, setThemeMode] = useState<string | undefined>(undefined);

  const hangleChangeTheme = (value: string) => {
    setTheme(value);
    if (value === 'system') {
      value = systemTheme || 'light';
    }
    setThemeMode(value);
  };

  useEffect(() => {
    let currentTheme = theme;
    if (theme === 'system') {
      currentTheme = systemTheme;
    }
    setThemeMode(theme || 'light');
  }, [systemTheme, theme]);

  return (
    <>
      <Select.Root
        value={themeMode || 'system'}
        onValueChange={hangleChangeTheme}
      >
        <Select.Trigger className={className}>
          <Select.Value placeholder="..." />
        </Select.Trigger>
        <Select.Content className="z-40">
          <Select.Item value="dark">
            <div className="flex gap-2 items-center">
              <Moon size={18} />
              <p>Escuro</p>
            </div>
          </Select.Item>
          <Select.Item value="light">
            <div className="flex gap-2 items-center">
              <SunDim size={18} />
              <p>Claro</p>
            </div>
          </Select.Item>
          <Select.Item value="system">
            <div className="flex gap-2 items-center">
              <Desktop size={18} />
              <p>Sistema</p>
            </div>
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );
}
