import { Button, buttonVariants } from "@/components/ui/button";
import { Cloud, LucideIcon, MoveRight, Pencil, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <main className="bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)">
        <div className="bg-background/90 w-full h-full">
          <div className="pt-32 pb-56 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
              All your
              <span className="text-blue-600"> Web Solutions </span>
              in One.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted-foreground">
              Welcome to Webworks. Develop modern websites that elevates your
              business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/app"
                className={buttonVariants({ variant: "default" })}
              >
                Dashboard
              </Link>
              <Button variant="ghost">Start for free &rarr;</Button>
            </div>
          </div>
        </div>
      </main>
      <section className="flex items-center justify-center">
        <div className="p-6 relative -top-24 ">
          <Image
            className="rounded-md shadow-md shadow-secondary"
            src={"/hero1.png"}
            alt="hero image"
            height={320}
            width={780}
          />
        </div>
      </section>

      <section className="pb-24 flex w-full px-40 justify-between">
        <div className="flex grow flex-col items-center gap-3">
          <div>
            <HelperIcon props={{ icon: User }} />
          </div>
          <h1 className="text-xl text-primary">Register</h1>
          <p className="text-center text-sm text-muted-foreground">
            Login to your account or create a new one if youre new
          </p>
        </div>
        <div className="h-min my-auto">
          <HelperIcon props={{ icon: MoveRight }} isArrow />
        </div>
        <div className="flex grow flex-col items-center gap-3">
          <div>
            <HelperIcon props={{ icon: Pencil }} />
          </div>
          <h1 className="text-xl text-primary">Create</h1>
          <p className="text-center text-sm text-muted-foreground">
            Create a new website or choose one from our templates
          </p>
        </div>
        <div className="h-min my-auto">
          <HelperIcon props={{ icon: MoveRight }} isArrow />
        </div>
        <div className="flex grow flex-col items-center gap-3">
          <div>
            <HelperIcon props={{ icon: Cloud }} />
          </div>
          <h1 className="text-xl text-primary">Deploy</h1>
          <p className="text-center text-sm text-muted-foreground">
            Save your changes and watch it deploy to our servers
          </p>
        </div>
      </section>
    </>
  );
};

const HelperIcon = ({
  props,
  isArrow,
}: {
  props: { icon: LucideIcon };
  isArrow?: boolean;
}) => {
  if (isArrow) return <props.icon className="text-muted h-16 w-16 stroke-1" />;
  return <props.icon className="w-24 h-24 text-muted-foreground stroke-1" />;
};

export default Header;
