"use client";
/** 지도를 드래그 했을떄 변하는 좌표 추출 */
import { useState, useEffect } from "react";
declare global {
  interface Window {
    naver: any;
  }
}

export const useCenterChange = (
  mapRef: React.MutableRefObject<naver.maps.Map | null>
): number[] => {
  //*사용자가 드래그 했을떄, 뷰포트 기준으로 위도경도 추출
  const [focusedCoords, setFocusedCoords] = useState<number[]>([0, 0]);
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapRef.current) {
      const handleCenterChange = () => {
        const center = mapRef.current?.getCenter() as naver.maps.LatLng;
        console.log("현재 지도 중심 좌표:", center.lat(), center.lng());
        const add: number[] = [center.lat(), center.lng()];
        const newLng = add.map((data) => parseFloat(data.toFixed(3)));
        setFocusedCoords(newLng);
      };

      // 지도 이동이 끝났을 때(드래그 종료) 이벤트 리스너 등록
      naver.maps.Event.addListener(
        mapRef.current,
        "dragend",
        handleCenterChange
      );

      let listener = naver.maps.Event.addListener(
        mapRef.current,
        "dragend",
        handleCenterChange
      );
      if (mapRef.current) {
        return () => {
          naver.maps.Event.removeListener(listener);
        };
      }
    }
  }, [mapRef.current]);
  return focusedCoords;
};
