import { clsxm } from "@/utils/clsxm";
import { SVGAttributes } from "react";

const SIZES = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
  "2xl": "w-12 h-12",
};

type Icons = "filters";
interface Props extends SVGAttributes<SVGElement> {
  icon: Icons;
  size?: keyof typeof SIZES;
}

export const Icon = ({ icon, size = "md", ...props }: Props) => {
  return (
    <svg {...props} className={clsxm("flex-shrink-0", SIZES[size], props.className)}>
      <use href={`/icons.svg#${icon}`} />
    </svg>
  );
};
