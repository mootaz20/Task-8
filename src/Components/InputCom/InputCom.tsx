import React from "react";

interface InputComProps {
  label: string;
  type: string;
  placeholder: string;
  callBackFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value : string;
  error : string
}

const InputCom: React.FC<InputComProps> = ({label,type,placeholder,callBackFunction,value,error} : InputComProps) => {
  return (
    <>
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={label}
            className="text-secondary text-sm mb-2.5 font-medium">
            {label}
          </label>
        )}
        <input
          className={`border rounded text-xs font-normal ${
            error ? "border-red-500" : "border-customGray"
          } `}
          value={value}
          type={type}
          name={label}
          id={label}
          placeholder={placeholder}
          style={{ padding: "15px 15px 14px", color: "rgba(205, 205, 205, 1)" }}
          onChange={(e) => callBackFunction(e)}
        />
      </div>
    </>
  );
}

export default InputCom