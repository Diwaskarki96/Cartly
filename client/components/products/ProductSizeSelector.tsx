import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSizeSelector({ size }) {
  console.log(size);
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
          {size.map((item, index) => {
            return <SelectItem key={index}>{item}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
