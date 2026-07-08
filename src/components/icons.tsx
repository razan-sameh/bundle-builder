import { StepMeta } from "@/lib/types";
import Image from "next/image";

export function StepIcon({ icon }: { icon: StepMeta["icon"] }) {
  const common = "h-4 w-4";
  switch (icon) {
    case "camera":
      return (
        <Image
          src={"/icons/camera.svg"}
          alt={"step 1"}
          width={20}
          height={20}
        />
      );
    case "plan":
      return (
        <Image src={"/icons/plan.svg"} alt={"step 1"} width={20} height={20} />
      );

    case "sensor":
      return (
        <Image
          src={"/icons/sensor.svg"}
          alt={"step 1"}
          width={20}
          height={20}
        />
      );

    case "shield":
      return (
        <Image
          src={"/icons/shield.svg"}
          alt={"step 1"}
          width={20}
          height={20}
        />
      );
  }
}

export function ChevronDown() {
  return (
    <Image
      src={"/icons/chevron-down.svg"}
      alt={"step 1"}
      width={12}
      height={12}
    />
  );
}

export function ChevronUp() {
  return (
    <Image
      src={"/icons/chevron-up.svg"}
      alt={"step 1"}
      width={12}
      height={12}
    />
  );
}
