import Link from "next/link";
import { Button } from "../ui/button";

export const LandingSection = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-between px-2 py-20 md:px-0">
      <div className="space-y-10">
        <div className="mx-auto w-fit rounded-full border bg-secondary px-20 py-2 text-center text-sm">
          <h1>
            Explore detailed API reference{" "}
            <Link
              className="text-blue-500 underline"
              href="https://fakerjs.dev/api/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </Link>
            !
          </h1>
        </div>
        <div className="mx-auto max-w-xl space-y-2 text-center">
          <h1 className="text-5xl font-black">Faux API</h1>
          <p>Generate realistic mock data for your API testing and development needs.</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link href="#demo">
            <Button>Example Demo</Button>
          </Link>
          <Link href="#usage">
            <Button variant="outline">View API</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center">
          The source code is available on{" "}
          <Link className="underline" href="https://fakerjs.dev/api/" target="_blank" rel="noopener noreferrer">
            Github
          </Link>
          .
        </h1>
      </div>
    </section>
  );
};
