'use client';

import { twMerge } from 'tailwind-merge';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={twMerge('au-label', className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
