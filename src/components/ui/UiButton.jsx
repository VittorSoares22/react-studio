import { forwardRef } from 'react';

export const uiButtonClass =
  'cursor-pointer rounded-md border border-border bg-surface ' +
  'px-2 py-0.5 text-[0.6875rem] leading-tight text-text transition-colors ' +
  'hover:border-accent hover:bg-surface-hover ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/50 focus-visible:outline-offset-1 ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

const uiButtonVariants = {
  default: uiButtonClass,
  primary:
    uiButtonClass +
    ' border-accent bg-accent text-white hover:border-accent hover:bg-accent/90 hover:text-white',
  secondary:
    uiButtonClass +
    ' border-transparent bg-transparent hover:border-transparent hover:bg-surface-hover',
  nav:
    'cursor-pointer transition-colors ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/50 focus-visible:outline-offset-1 ' +
    'disabled:cursor-not-allowed disabled:opacity-45',
};

const UiButton = forwardRef(function UiButton(
  {
    className = '',
    variant = 'default',
    type = 'button',
    loading = false,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const baseClass = uiButtonVariants[variant] ?? uiButtonVariants.default;
  const classes = className ? `${baseClass} ${className}` : baseClass;

  return (
    <button
      ref={ref}
      type={type}
      {...props}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}
    >
      {children}
    </button>
  );
});

UiButton.displayName = 'UiButton';

export default UiButton;
