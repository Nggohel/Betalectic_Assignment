interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
  }
  
  export function Textarea({
    value,
    onChange,
    placeholder,
    rows = 3,
    className,
  }: TextareaProps) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`border p-2 w-full ${className}`}
      />
    );
  }
  