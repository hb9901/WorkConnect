"use client";

import Link from "next/link";

export const TestLinkButton = ({ href, children, className, ...props }: { href: string, children: React.ReactNode, className?: string }) => {
  return (
    <Link href={href}>
      <div className={`bg-blue-500 text-white px-7 py-3 rounded-md inline-flex ${className}`} {...props}>{children}</div>
    </Link>
  );
};

const TestButton = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return <button className={`bg-blue-500 text-white px-7 py-3 rounded-md ${className}`} {...props}>{children}</button>;
};

export default TestButton;