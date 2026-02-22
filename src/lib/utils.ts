import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addClassToSpan(htmlString: string | undefined, className: string) {
  if (!htmlString) return '';
  
  return htmlString.replace(
    /<span>(.*?)<\/span>/g,
    `<span class="${className}">$1</span>`
  );
}