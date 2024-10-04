"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export const useNaverOverlay = () => {};
