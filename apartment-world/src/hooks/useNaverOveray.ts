"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export const useNaverOverlay = () => {};
