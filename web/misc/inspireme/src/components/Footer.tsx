import React from "react";
import Image from "next/image";
import { footerLinks } from "constant";

type ColumnProps = {
  title?: string;
  links?: Array<string>;
};

const Footer = () => {
  const FooterColumn = ({ title, links }: ColumnProps) => {
    return (
      <div className="footer_column">
        <h4 className="font-semibold">{title}</h4>
        <div className="flex flex-col gap-2">
          {links?.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-primary text-sm font-normal text-white"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <footer className="flexStart footer">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-start">
          <Image src="/logo-purple.svg" width={115} height={38} alt="logo" />
          <p className="mt-4 max-w-xs text-sm font-normal text-white">
            Flexibble is the world&apos;s leading community for creatives to
            share , grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0]?.title}
            links={footerLinks[0]?.links}
          />
          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[1]?.title}
              links={footerLinks[1]?.links}
            />
            <FooterColumn
              title={footerLinks[2]?.title}
              links={footerLinks[2]?.links}
            />
          </div>
          <FooterColumn
            title={footerLinks[3]?.title}
            links={footerLinks[3]?.links}
          />
          <div className="flex flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[4]?.title}
              links={footerLinks[4]?.links}
            />
            <FooterColumn
              title={footerLinks[5]?.title}
              links={footerLinks[5]?.links}
            />
          </div>
          <FooterColumn
            title={footerLinks[6]?.title}
            links={footerLinks[6]?.links}
          />
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p className="text-sm font-normal text-white">
          © 2021 Flexibble. All rights reserved.
        </p>
        <p className="text-gray">
          <span className="text-black">10,214</span> Projects Submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
