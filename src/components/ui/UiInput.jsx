import { forwardRef } from 'react';

export const uiInputClass =
  'box-border h-9 min-h-9 w-full max-w-[280px] rounded-lg border border-border ' +
  'bg-surface px-3 text-sm text-text ' +
  'placeholder:text-muted ' +
  'focus:outline focus:outline-2 focus:outline-accent/45 focus:outline-offset-1';

const UiInput = forwardRef(function UiInput({ className = '', ...props }, ref) {
  const classes = className ? `${uiInputClass} ${className}` : uiInputClass;
  return <input ref={ref} className={classes} {...props} />;
});

UiInput.displayName = 'UiInput';

export default UiInput;
