import clsx from 'clsx';

export default function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        'relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden w-full max-w-(--breakpoint-sm) mx-auto',
        className
      )}
      {...props}
    />
  );
}
