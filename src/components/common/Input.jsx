"use client";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { get } from "lodash";
import { MoveDown, Tag, X, EyeOff, Eye } from "lucide-react";
import { cn } from "../../Utils/common-utils";

export const inputStyle =
  "w-full px-4 py-4 rounded-xl font-medium border border-gray-light placeholder:text-gray-color placeholder:font-normal text-sm focus:outline-none focus:border-gray-light focus:bg-white disabled:cursor-not-allowed";

export const labelStyle = "mb-1 text-sm text-gray-500 font-semibold";

export default function Input({
  label = "",
  name,
  type = "text",
  required = true,
  placeholder = "",
  options = [],
  Icon,
  hideError,
  lableClassName,
  inputClassName,
  menuPortalTarget = typeof document !== "undefined" ? document.body : null,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors, touchedFields, submitCount },
    control,
    trigger,
    register,
    setValue,
    watch,
  } = useFormContext();
  const tags = watch(name, []);

  const [inputValue, setInputValue] = useState("");

  const addTag = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setValue(name, [...tags, inputValue.trim()]); // Update form state
      setInputValue(""); // Clear input
    }
  };

  const removeTag = (index) => {
    setValue(
      name,
      tags.filter((_, i) => i !== index)
    );
  };

  const getErrorMessage = (name) => {
    const error = get(errors, name);
    if (error && error.message) {
      return error?.message || "";
    }
    return null;
  };

  const getError = () => {
    return (
      Boolean(get(errors, name)) &&
      !hideError && (
        <span className="text-red-600 text-sm p-2">
          {getErrorMessage(name)}
        </span>
      )
    );
  };

  const getLabel = () =>
    label && (
      <label className={cn(labelStyle, lableClassName)}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    );

  const renderTextInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative">
            <input
              type={type}
              className={cn(inputStyle, Icon ? "!pl-12" : "")}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                if (type === "email") {
                  e.target.value = e?.target?.value?.toLowerCase();
                  field.onChange(e);
                } else {
                  field?.onChange(e);
                }
              }}
              autoComplete="off"
              {...props}
            />
            {Icon ? (
              <Icon
                fontSize={25}
                className="absolute top-[50%] left-4 text-gray-black z-10 translate-y-[-50%]"
              />
            ) : null}
          </div>
          {getError()}
        </div>
      )}
    />
  );

  const renderTagInput = () => (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="w-full ">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={addTag}
              onBlur={field.onBlur}
              placeholder={placeholder}
              className={inputStyle}
              {...props}
            />
          </div>
          {tags?.length > 0 ? "" : getError()}
          {tags.length > 0 && (
            <div className="flex items-center py-2 mt-2 gap-4 flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-small-light py-3 px-4">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-sm"
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );

  const renderTagInputUpdated = () => (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={addTag}
              onBlur={field.onBlur}
              placeholder={placeholder}
              className={cn(
                "w-full bg-white text-gray-700 border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2",
                inputClassName
              )}
              {...props}
            />
            <Tag
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
          </div>
          {tags?.length > 0 ? "" : getError()}
          {tags.length > 0 && (
            <div className="flex items-center py-2 mt-2 gap-4 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-darken text-white py-1 px-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-darken/80 transition-colors"
                  onClick={() => console.log(`Tag clicked: ${tag}`)} // Optional: Add click functionality
                >
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the onClick of the span
                      removeTag(index);
                    }}
                    className="text-sm text-white hover:text-gray-200"
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );

  const renderPasswordInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col relative">
          {getLabel()}
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : type}
              className={cn(inputStyle, Icon ? "!pl-12" : "")}
              placeholder={placeholder}
              {...field}
              {...props}
              autoComplete="off"
            />
            {Icon ? (
              <Icon
                fontSize={25}
                className="absolute top-[50%] left-4 text-gray-black z-10 translate-y-[-50%]"
              />
            ) : null}
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                fontSize={25}
                className="absolute top-[50%] right-2 text-black z-10 translate-y-[-50%]"
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(!showPassword)}
                fontSize={25}
                className="absolute top-[50%] right-2 text-black/50 z-10 translate-y-[-50%]"
              />
            )}
          </div>
          {getError()}
        </div>
      )}
    />
  );

  const renderTextAreaInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <textarea
            className={cn(inputStyle)}
            placeholder={placeholder}
            rows={4}
            {...field}
            {...props}
          />
          {getError()}
        </div>
      )}
    />
  );

  const renderNewSelectInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative">
            <Select
              styles={customStyles}
              options={options}
              className="basic-multi-select focus:outline-none focus:shadow-none"
              classNamePrefix="select"
              {...field}
              onChange={(v) => setValue(name, v?.value)}
              value={options?.find((v) => v?.value === field?.value)}
              isDisabled={props?.disabled}
              menuPortalTarget={
                typeof document !== "undefined" ? document.body : null
              } // Renders the dropdown outside of the current scrollable container
              menuPosition="fixed" // Makes the dropdown position fixed
              autoFocus={false} // Prevents focus behavior causing auto-scroll
            />
          </div>
          {getError()}
        </div>
      )}
    />
  );

  const renderSelectInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative">
            <select
              className={cn(inputStyle, "appearance-none")}
              {...field}
              disabled={props?.disabled}
            >
              <option value={placeholder || "Select..."}>
                {placeholder || "Select..."}
              </option>
              {options?.map((item) => (
                <option key={item?.value} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>
            <MoveDown className="absolute top-1/2 right-5 transform -translate-y-1/2 pointer-events-none font-thin" />
          </div>
          {getError()}
        </div>
      )}
    />
  );
  const customStyles = {
    placeholder: (base) => ({
      ...base,
      fontSize: "0.875rem ", // Tailwind text-sm
      color: "#9CA3AF", // Tailwind slate-400
      fontWeight: "normal",
    }),
    control: (base, state) => {
      return {
        ...base,
        height: "54px",
        borderRadius: "8px",
      };
    },
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };
  const renderMultiSelectInput = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative">
            <Select
              styles={customStyles}
              isMulti
              options={options}
              className="basic-multi-select focus:outline-none focus:shadow-none"
              classNamePrefix="select"
              {...field}
              isDisabled={props?.disabled}
              // menuPortalTarget={
              //   typeof document !== "undefined" ? document.body : null
              // } // Renders the dropdown outside of the current scrollable container
              menuPosition="fixed" // Makes the dropdown position fixed
              autoFocus={false} // Prevents focus behavior causing auto-scroll
            />
          </div>
          {getError()}
        </div>
      )}
    />
  );

  const renderMultiSelectCategories = () => (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <div className="flex flex-col">
          {getLabel()}
          <div className="relative z-50">
            <Select
              isMulti
              options={options}
              className="basic-multi-select focus:outline-none focus:shadow-none"
              classNamePrefix="select"
              {...field}
              isDisabled={props?.disabled}
              menuPortalTarget={
                typeof document !== "undefined" ? document.body : null
              } // render dropdown outside the parent container
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
                control: (base) => ({
                  ...base,
                  height: "54px",
                  borderRadius: "8px",
                }),
              }}
            />
          </div>
          {getError()}
        </div>
      )}
    />
  );

  const multiSelectWithTags = () => {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => {
          const handleChange = (selected) => {
            const updated = [...(field.value || []), selected];
            field.onChange(updated);
          };

          const handleRemove = (valueToRemove) => {
            const updated = (field.value || []).filter(
              (item) => item.value !== valueToRemove
            );
            field.onChange(updated);
          };

          // Filter out selected options from available options
          const selectedValues = (field.value || []).map((item) => item.value);
          const filteredOptions = options.filter(
            (option) => !selectedValues.includes(option.value)
          );

          return (
            <div className="flex flex-col gap-1">
              {getLabel?.()}
              <Select
                value={null} // keep the value empty to always show placeholder
                onChange={handleChange}
                options={filteredOptions}
                placeholder={placeholder ? placeholder : "Select option"}
                classNamePrefix="select"
                className="react-select-container"
                isDisabled={props?.disabled}
                menuPortalTarget={
                  menuPortalTarget
                    ? typeof document !== "undefined"
                      ? document.body
                      : null
                    : null
                }
                menuPosition="fixed"
                autoFocus={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "54px",
                    borderRadius: "8px",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "0.875rem ", // Tailwind text-sm
                    color: "#a1a1aa", // Tailwind slate-400
                  }),
                }}
              />

              {/* Custom Tag Display */}
              {Array.isArray(field.value) && field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((tag) => (
                    <div
                      key={tag.value}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground border border-muted-foreground"
                      )}
                    >
                      {tag.label}
                      <button
                        type="button"
                        onClick={() => handleRemove(tag.value)}
                        className="hover:text-destructive focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {getError?.()}
            </div>
          );
        }}
      />
    );
  };

  const renderInput = () => {
    switch (type) {
      case "radio":
        return (
          <Controller
            control={control}
            name={name}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field }) => (
              <div className="flex flex-col">
                <label
                  className={`flex items-center mb-2 text-black font-medium ${
                    props?.disabled ? "opacity-50 cursor-not-allowed" : ""
                  } ${props?.className ? props?.className : ""}`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={field?.value}
                    {...field}
                    {...props}
                  />
                  {label}
                </label>
                {getError()}
              </div>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            control={control}
            name={name}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field }) => (
              <div className="flex flex-col">
                <label
                  className={`flex items-start text-black font-medium sm:text-base text-sm ${
                    props?.disabled ? "opacity-50 cursor-not-allowed" : ""
                  } ${props?.className ? props?.className : ""}`}
                >
                  <input
                    type="checkbox"
                    className="mr-3 mt-1 w-4 h-4 cursor-pointer"
                    checked={field?.value}
                    {...field}
                    {...props}
                  />
                  {label}
                </label>
                {getError()}
              </div>
            )}
          />
        );

      case "select":
        return renderSelectInput();
      case "react-select":
        return renderNewSelectInput();
      case "select-multiple":
        return renderMultiSelectInput();

      case "textarea":
        return renderTextAreaInput();

      case "password":
        return renderPasswordInput();

      case "tag":
        return renderTagInput();
      case "productCategories":
        return renderMultiSelectCategories();
      default:
        return renderTextInput();
    }
  };

  return renderInput();
}
