import { type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

interface IconButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}
export function IconButton({
  title,
  className = "",
  onClick,
  children,
}: PropsWithChildren<IconButtonProps>) {
  return (
    <button
      title={title}
      type="button"
      className={cn(
        "font-normal rounded-md py-2 flex items-center justify-center text-center",
        className
      )}
      onClick={onClick}
    >
      <span className="sr-only">{title}</span>
      {children}
    </button>
  );
}
