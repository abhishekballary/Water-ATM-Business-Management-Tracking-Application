import type { ChangeEvent } from 'react';

type Props = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  options?: { label: string; value: string }[];
};

export default function FormInput({ label, name, value, onChange, type = 'text', options }: Props) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span>{label}</span>
      {options ? (
        <select name={name} value={value} onChange={onChange} className="rounded border p-2">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} className="rounded border p-2" required />
      )}
    </label>
  );
}
