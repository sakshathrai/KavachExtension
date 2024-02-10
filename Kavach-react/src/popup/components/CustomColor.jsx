import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const CustomColor = ({ onColorChange }) => {
  const toast = useRef(null);
  const [labelColors, setLabelColors] = useState({
    Urgency: "#FF5733",
    Scarcity: "#33FF57",
    Misdirection: "#5733FF",
    "Social Proof": "#FF33C7",
    Obstruction: "#33FFEC",
    Sneaking: "#FFE600",
    "Forced Action": "#33C7FF",
  });

  useEffect(() => {
    onColorChange(labelColors);
  }, [labelColors, onColorChange]);

  const show = () => {
    const values = getValues("value");
    const detail = values
      .map((value, i) => value.name + (i < values.length - 1 ? ", " : ""));

    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail,
    });
  };

  const defaultValues = {
    value: null,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    data.value && show();
    reset();
  };

  const handleColorChange = (label, color) => {
    setLabelColors((prevLabelColors) => ({
      ...prevLabelColors,
      [label]: color,
    }));
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column align-items-center gap-2"
      >
        <Toast ref={toast} />
        <Controller
          name="value"
          control={control}
          rules={{ required: "Value is required." }}
          render={({ field }) => (
            <MultiSelect
              id={field.name}
              name="value"
              value={field.value}
              options={Object.keys(labelColors).map((label) => ({
                name: label,
                color: labelColors[label],
              }))}
              onChange={(e) => field.onChange(e.value)}
              optionLabel="name"
              placeholder="Select Labels"
              maxSelectedLabels={3}
              className="w-full md:w-20rem"
              itemTemplate={(option) => (
                <div
                  style={{
                    color: option.color,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {option.name}
                  <input
                    type="color"
                    value={option.color}
                    onChange={(e) =>
                      handleColorChange(option.name, e.target.value)
                    }
                    style={{ marginLeft: "8px" }}
                  />
                </div>
              )}
            />
          )}
        />

        {getFormErrorMessage("value")}
        <Button type="submit" label="Submit" className="mt-2" />
      </form>
    </div>
  );
};

export default CustomColor;
