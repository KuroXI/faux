import { DynamicFields } from "../field/DynamicFields";

export const DemoSection = () => {
  return (
    <section id="demo" className="w-full space-y-10 bg-accent px-2 py-20 md:px-0">
      <h1 className="text-center text-2xl font-semibold">Example Demo</h1>
      <div className="mx-auto w-full max-w-screen-md rounded bg-background p-5 shadow">
        <DynamicFields />
      </div>
    </section>
  );
};
