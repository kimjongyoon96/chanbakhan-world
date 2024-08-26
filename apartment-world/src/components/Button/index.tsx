import styles from "./index.module.scss";
import { ReactNode } from "react";
import Link from "next/link";
interface Props {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  disabled: boolean;
  link?: string;
  size?: "tiny" | "small";
  skin?: "primary" | "inverse" | "ghost";
  type?: "submit" | "reset" | "button";
}

const button = ({
  children,
  className,
  onClick,
  disabled,
  link,
  size,
  skin,
  type,
}: Props) => {
  if (link) {
    return <Link href={link}>{children}</Link>;
  }

  return <button type={type} onClick={onClick} disabled={disabled}></button>;
};

export default button;
