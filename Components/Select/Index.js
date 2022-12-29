import AsyncSelect from "react-select";

const InputSelect = ({
  name,
  data,
  set,
  value,
  size,
  className,
  error,
  isDisabled,
}) => {
  const handleSelectChange = (item) => {
    set(item);
  };

  return (
    <>
      <AsyncSelect
        id={name}
        name={name}
        value={value}
        isClearable={true}
        options={data}
        onChange={(item) => handleSelectChange(item)}
        size={size}
        className={className}
        placeholder="Seleccionar"
        error={error}
        isDisabled={isDisabled}
      />
    </>
  );
};
export default InputSelect;
