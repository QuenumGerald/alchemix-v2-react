import { useEffect, useState } from "react";
import { Link, useMatchRoute, useLocation } from "@tanstack/react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/cn";
import { ToOptions } from "@tanstack/react-router";
import { IS_TENDERLY_FORK } from "@/lib/wagmi/tenderly";

export const routeTitleToPathMapping = {
  Vaults: "/vaults",
  Transmuter: "/transmuters",
  Bridge: "/bridge",
  Farms: "/farms",
  Governance: "/governance",
  Utilities: "/utilities",
} as const satisfies Record<string, ToOptions["to"]>;

export function Header() {
  const { pathname } = useLocation();
  const matchRoute = useMatchRoute();

  const [openMobileNav, setOpenMobileNav] = useState(false);

  useEffect(() => {
    setOpenMobileNav(false);
  }, [pathname]);

  return (
    <header className="flex items-center justify-between border-b border-grey5inverse bg-grey30inverse p-4 md:pb-5 md:pl-8 md:pt-5">
      <div className="flex items-center justify-between gap-10">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <img
              src="/images/icons/ALCX_Std_logo.svg"
              className="h-11 invert"
              alt="The Alchemix logo"
            />
          </Link>
        </div>
        <input
          id="hamburger"
          type="checkbox"
          checked={openMobileNav}
          onChange={() => setOpenMobileNav((prev) => !prev)}
          className="peer hidden"
        />
        <label
          htmlFor="hamburger"
          className="cursor-pointer text-black md:hidden"
        >
          <HamburgerMenuIcon />
        </label>
        <div className="absolute -left-20 top-0 flex flex-col items-center justify-between gap-10 bg-slate-300 p-8 opacity-0 transition-all peer-checked:translate-x-20 peer-checked:opacity-100 md:hidden">
          {Object.keys(routeTitleToPathMapping).map((item) => (
            <Link
              key={item}
              to={
                routeTitleToPathMapping[
                  item as keyof typeof routeTitleToPathMapping
                ]
              }
              className={cn(
                "text-xl transition-colors hover:text-black",
                matchRoute({
                  to: routeTitleToPathMapping[
                    item as keyof typeof routeTitleToPathMapping
                  ],
                  fuzzy: true,
                })
                  ? "text-black"
                  : "text-slate-500",
              )}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {IS_TENDERLY_FORK && (
          <Link to="/debug">
            <div className="border border-red1 bg-grey5inverse p-2">FORK </div>
          </Link>
        )}
        <ConnectButton
          accountStatus="address"
          chainStatus="icon"
          showBalance={{ smallScreen: false, largeScreen: true }}
        />
      </div>
    </header>
  );
}
