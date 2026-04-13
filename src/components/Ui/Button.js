export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const baseClass = `px-4 py-2 rounded-lg font-medium transition duration-300`;

  const variants = {
    primary: `bg-red-500 text-white hover:bg-red-600`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300`,
    outline: `border-2 border-red-500 text-red-500 hover:bg-red-50 `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
