import { ToolbarButtonProps } from "./types/editor";

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  children,
  title,
  disabled = false,
}) => {


  return (
    <button
      onClick={onClick}
      className={`toolbar-button ${isActive ? "is-active" : ""}`}
      type="button"
      title={title}
      disabled={disabled}
      // Inline styles as fallback
      style={{
        backgroundColor: isActive ? "#000000" : undefined,
        color: isActive ? "#ffffff" : undefined,
        borderColor: isActive ? "#000000" : undefined,
      }}
    >
      {children}
    </button>
  );
};

export default ToolbarButton