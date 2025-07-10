import React, {useId} from "react";
import {Input, InputNumber, InputProps} from "antd";

import {classNames} from "@/shared/lib/classNames";

import css from "./Field.module.scss";

interface FieldProps extends InputProps {
  label?: string;
  inputType?: "password" | "number" | "text";
  placeholder?: string;
  classNameWrap?: string;
  className?: string;
  classNameLabel?: string;
  classNameLabelActive?: string;
  value?: any;
  min?: number;
  max?: number;
  autoComplete?: string;
}

const Field: React.FC<FieldProps> = ({
                                       label,
                                       inputType = "text",
                                       placeholder,
                                       classNameWrap,
                                       className,
                                       classNameLabel,
                                       classNameLabelActive,
                                       value,
                                       prefix,
                                       min,
                                       max,
                                       autoComplete,
                                       ...props
                                     }) => {
  const id = useId();
  const inputNumberProps: any = props;


  if (inputType === "password") {
    return (
      <>
        <div className={classNames(css.FieldWrap, classNameWrap || "")}>
          {label ? (
            <label
              htmlFor={id}
              className={classNames(
                css.Label,
                classNameLabel || "",
              )}
            >
              {label}
            </label>
          ) : null}
          <Input.Password
            {...props}
            id={id}
            placeholder={placeholder}
            className={classNames(css.Field, className || "")}
            autoComplete={autoComplete}
          />
        </div>
      </>
    );
  }
  if (inputType === "number") {
    return (
      <>
        <div className={classNames(css.FieldWrap, classNameWrap || "")}>
          {label ? (
            <label
              htmlFor={id}
              className={classNames(
                css.Label,
                classNameLabel || "",
              )}
            >
              {label}
            </label>
          ) : null}
          <InputNumber
            {...inputNumberProps}
            type={"number"}
            id={id}
            min={min}
            max={max}
            placeholder={placeholder}
            prefix={prefix}
            value={value}
            className={classNames(css.Field, className || "")}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classNames(css.FieldWrap, classNameWrap || "")}>
        {label ? (
          <label
            htmlFor={id}
            className={classNames(
              css.Label,
              classNameLabel || "",
            )}
          >
            {label}
          </label>
        ) : null}
        <Input
          {...props}
          id={id}
          placeholder={placeholder}
          prefix={prefix}
          value={value}
          autoComplete={autoComplete}
          className={classNames(css.Field, className || "")}
        />
      </div>
    </>
  );
};

export default Field;
