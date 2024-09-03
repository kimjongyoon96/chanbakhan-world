import cx from "clsx";
import { ReactNode, memo, useState, useEffect } from "react";
import { useMount, useUnmount } from "react-use";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./index.module.scss";
interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void | boolean;
  yesClick: () => void;
}

export const Modal = memo(({ isOpen, children, onClose, yesClick }: Props) => {
  const [mounted, setMounted] = useState(false);
  useMount(() => {
    //useMount는 마운트시 한번만 실행할 콜백함수를 정의
    setMounted(true);
  });

  if (!mounted && !isOpen) return null;
  console.log("모달실행완료");
  return (
    <div className={styles.modalWrapper}>
      <h3>{children}</h3>
      <button
        className={styles.lefButton}
        onClick={yesClick}
        aria-label="l-button"
      >
        예
      </button>
      <button
        className={styles.rightButton}
        onClick={onClose}
        aria-label="r-button"
      >
        아니요
      </button>
    </div>
  );
});
