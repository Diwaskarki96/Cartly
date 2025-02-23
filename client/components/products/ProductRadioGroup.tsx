import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const ProductRadioGroup = ({ color }) => {
  // Ensure `color` is always an array

  // Convert `color` to an array if it's a string
  const colors =
    typeof color === "string" ? [color] : Array.isArray(color) ? color : [];

  return (
    <RadioGroup defaultValue={colors[0]} className="flex gap-4">
      {colors.length > 0 ? (
        colors.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={item} id={`item-${index}`} />
            <Label htmlFor={`item-${index}`} className="flex items-center">
              <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item }}
              ></span>
            </Label>
          </div>
        ))
      ) : (
        <p>No colors available.</p>
      )}
    </RadioGroup>
  );
};

export default ProductRadioGroup;
