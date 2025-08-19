import { FC } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: FC = () => {
  return (
    <footer className="px-28 pt-20 pb-10 text-[14px]">
      <div className="flex justify-between">
        <div className="space-y-6">
          <h2 className="text-3xl font-normal whitespace-pre-line">
            Take action to <span className="block">protect wetlands</span>
          </h2>
          <Button variant="outline" className="rounded-full">
            Take action
          </Button>
        </div>
        <p className="max-w-md">
          The Gap Map platform was created to support policy makers, communities and investors to
          act on this urgency. The platform serves as a one stop shop to provide these users with
          the information they need to make decisions on where to focus their actions. This is done
          by integrating the latest and most innovative remote sensing work within the Sahel and
          combining this with easy to digest insights and stories on the different vital roles
          wetlands play and where they are located.
        </p>
      </div>
      <Separator className="my-10" />
      <div className="flex justify-between">
        <p>Copyright 2025</p>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="#">Terms of use</Link>
            </li>
            <li>
              <Link href="#">Privacy policy</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
