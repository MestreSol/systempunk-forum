type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  level?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  variant?: 'solid' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
};
export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    disabled,
    className,
    type = 'button',
    level = 'primary',
    variant = 'solid',
    size = 'medium',
    icon,
    loading = false,
    loadingText = '',
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
