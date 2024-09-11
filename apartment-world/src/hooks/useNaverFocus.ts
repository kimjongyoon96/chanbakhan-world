"use client";
import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
export const useNaverFocus = (
  mapRef: React.MutableRefObject<naver.maps.Map | null>
): [number, number] => {
  const [centerCoords, setCenterCoords] = useState<[number, number]>([0, 0]);

  const updateCenter = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter() as naver.maps.LatLng;
      setCenterCoords([center.lat(), center.lng()]);
    }
  }, [mapRef]);
  console.log("NaverFocus Test1");
  useEffect(() => {
    const { naver } = window;
    const map = mapRef.current;
    console.log("Effect running, mapRef.current:", map);
    console.log("window.naver:", window.naver);
    if (typeof window === "undefined" || !mapRef.current || !window.naver) {
      console.log("아직 맵이 로드되지 않았습니다.");
      return;
    }

    console.log("TEST!!");

    updateCenter();
    console.log("NaverFocus Test2");

    // const handleIdle = () => {
    //   if (map) {
    //     const center = map?.getCenter() as naver.maps.LatLng; // as~ 타입 단언
    //     console.log(center, "지도 위치의 라따롱따");
    //     const latitude = center.lat();
    //     const longitude = center.lng();
    //     setCenterCoords([latitude, longitude]);
    //     console.log("드래그 시 위도경도", latitude, longitude);
    //   }

    // dragend 이벤트 리스너 등록
    naver.maps.Event.addListener(map, "center_changed", updateCenter);
    //   naver.maps.Event.addListener(map, "idle", handleIdle);
    // };
    console.log("NaverFocus Test3");

    return () => {
      naver.maps.Event.removeListener(map, "center_changed", updateCenter);
    };
  }, [mapRef, updateCenter]);

  return centerCoords;
};
