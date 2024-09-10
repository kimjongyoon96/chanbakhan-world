"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
export const useNaverFocus = (
  mapRef: React.MutableRefObject<naver.maps.Map | null>
): [number, number] => {
  const [centerCoords, setCenterCoords] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const { naver } = window;
    if (typeof window === "undefined" || !mapRef.current || !window.naver) {
      console.log("useNaverFocus mapRef.current is null");
      return;
    }
    // 지도가 로드된 이후만 실행
    const map = mapRef.current;
    console.log("useNaverFocus에서의 map", map);
    const handleIdle = () => {
      if (mapRef.current) {
        const center = mapRef.current.getCenter() as naver.maps.LatLng; // as~ 타입 단언
        console.log(center, "지도 위치의 라따롱따");
        const latitude = center.lat();
        const longitude = center.lng();
        setCenterCoords([latitude, longitude]);
        console.log("드래그 시 위도경도", latitude, longitude);
      }

      // dragend 이벤트 리스너 등록
      naver.maps.Event.addListener(map, "dragend", handleIdle);

      return () => {
        naver.maps.Event.removeListener(map, "dragend", handleIdle);
      };
    };

    // idle 이벤트가 발생하면 지도가 완전히 로드된 것으로 간주
    naver.maps.Event.addListener(map, "idle", handleIdle);

    return () => {
      naver.maps.Event.removeListener(mapRef.current, "dragend", handleIdle);
    };
  }, [mapRef]);

  return centerCoords;
};
