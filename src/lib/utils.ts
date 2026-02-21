import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addClassToSpan(htmlString: string, className: string) {
  return htmlString.replace(/<span>(.*?)<\/span>/g, `<span class="${className}">$1</span>`);
}