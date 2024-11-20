import React, { InputHTMLAttributes, SetStateAction } from "react";

interface props {
  setState: React.Dispatch<SetStateAction<string>>;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({ setState, inputProps }: props) {
  return (
    <input
      {...inputProps}
      className="p-2 border border-gray-300 rounded-md text-sm text-gray-700"
      onChange={(e) => setState(e.target.value)}
    />
  );
}
