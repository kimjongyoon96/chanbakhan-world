// hooks/useNaverMap.ts
"use client";
import { useEffect, useRef, useState } from "react";
declare global {
  interface Window {
    naver: any;
  }
}

export const useNaverMap = (
  mapId: string,
  options: { center: number[]; zoom: number }
): React.MutableRefObject<naver.maps.Map | null> => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  // console.log("useNaverMap 에서의 옵션변경값", options.center);
  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === "undefined") return;

    const initializeMap = () => {
      const { naver } = window;
      if (naver && naver.maps) {
        const mapOptions = {
          center: new naver.maps.LatLng(...options.center),
          zoom: options.zoom,
        };
        mapRef.current = new naver.maps.Map(mapId, mapOptions); // mapRef.current의 값
        // console.log("네이버맵훅 mapRef값:", mapRef.current);
      } else {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
      }
    };

    // 네이버 지도 스크립트 로드
    const loadMapScript = async () => {
      try {
        const response = await fetch("/api/returnMapData");
        const scriptHtml = await response.text();
        const scriptElement = document.createElement("div");
        scriptElement.innerHTML = scriptHtml;
        document.head.appendChild(scriptElement.firstChild as Node);

        // 스크립트가 로드되면 초기화
        initializeMap();
      } catch (error) {
        console.error("지도 스크립트를 로드하는 중 오류 발생:", error);
      }
    };

    loadMapScript();
    return () => {
      // 컴포넌트가 언마운트될 때 맵 인스턴스 제거
      if (mapRef.current) {
        mapRef.current.destroy();

        mapRef.current = null;
      }
    };
  }, [options.center, options.zoom]);

  return mapRef;
};
