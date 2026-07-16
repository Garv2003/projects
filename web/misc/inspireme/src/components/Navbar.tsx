import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "../../constant";

const Navbar = () => {
  const session = {};

  return (
    <div className="flexBetween navbar">
      <div className="flexStart flex-1 gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="InspireMe Logo" width={115} height={43} />
        </Link>
        <ul className="text-small hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session ? (
          <>
            <Image src="/avatar.svg" alt="Avatar" width={40} height={40} />
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <Link href="/login" className="flexCenter gap-4">
            <button className="rounded-lg border p-2">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
