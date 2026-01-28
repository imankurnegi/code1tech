import React, { useEffect, useState } from "react";

type DynamicIconProps = {
  name?: string;
  className?: string;
};

function toPascalCase(name: string): string {
  return name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const [Icon, setIcon] = useState<React.ComponentType<{ className?: string }> | null>(null);

  useEffect(() => {
    if (!name) {
      import("lucide-react").then((mod) => {
        setIcon(() => (mod as any).HelpCircle);
      });
      return;
    }

    const fixedName = toPascalCase(name);

    import("lucide-react").then((mod) => {
      const LoadedIcon = (mod as any)[fixedName];
      setIcon(() => LoadedIcon || (mod as any).HelpCircle);
    });
  }, [name]);

  if (!Icon) return null;

  return <Icon className={className} />;
}
