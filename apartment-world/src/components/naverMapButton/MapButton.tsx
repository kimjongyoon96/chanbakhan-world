"use client";
import Button from "../Button";
import { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";

interface ButtonWrapperProps {
  buttons: Array<{
    id: string;
    label: string;
    onClick: () => void;
  }>;
}

const ButtonWrapperComponent = ({ buttons }: ButtonWrapperProps) => {
  return (
    <div className={styles.buttonWrapper}>
      {buttons.map((button) => (
        <button
          className={styles.small}
          key={button.id}
          onClick={button.onClick}
          type="button"
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonWrapperComponent;
