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

  const levelClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-black hover:bg-yellow-600",
  }

  const variantClasses = {
    solid: "",
    outline: "border border-current bg-transparent",
    text: "bg-transparent underline",
  };

  const sizeClass = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }

  const baseClasses = `rounded disabled:opacity-50 flex items-center justify-center`;
  const computedClasses = `${baseClasses} ${sizeClass[size]} ${variantClasses[variant]} ${levelClasses[level]} ${className}`
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${computedClasses}`}
    >
      {loading ? (
        <>
        {icon && <span className="mr-2">{icon}</span>}
        {loadingText || "Loading"}
        </>
      ):(
        <>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        </>
      )}
    </button>
  );
}
