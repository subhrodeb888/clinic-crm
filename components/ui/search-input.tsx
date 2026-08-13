import { Search } from "lucide-react";

import { Input } from "./input";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="
          absolute left-3 top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <Input className={`pl-9 ${className}`} {...props} />
    </div>
  );
}
