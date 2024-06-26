import { usageCode } from "@/lib/constant";
import { Code } from "../field/Code";

export const UsageSection = () => {
  return (
    <section id="usage" className="w-full space-y-10 px-2 py-20 md:px-0">
      <h1 className="text-center text-2xl font-semibold">Usage</h1>
      <div className="mx-auto w-fit">
        <Code code={usageCode} />
      </div>
    </section>
  );
};
