import styles from "./index.module.scss";
import { ReactNode } from "react";
import Link from "next/link";
import cx from "clsx";

interface Props {
  children?: ReactNode;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  link?: string;
  size?: "tiny" | "small";
  skin?: "primary" | "inverse" | "ghost";
  type?: "submit" | "reset" | "button";
  name?: string;
}

const Button = ({
  children,
  className,
  onClick,
  disabled,
  link,
  size,
  skin,
  type,
  name,
}: Props) => {
  if (link) {
    return <Link href={link}>{children}</Link>;
  }

  return (
    <button
      type={type}
      className={cx(
        styles.commonButton,
        className,
        styles[size ?? "normal"],
        styles[skin ?? "normal"]
      )}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {" "}
      {children}
    </button>
  );
};

export default Button;
