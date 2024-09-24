"use client";
import { StaticImageData } from "next/image";
import { useEffect } from "react";
declare global {
  interface Window {
    naver: any;
  }
}

export const useNaverMarker = (
  mapRef: React.MutableRefObject<naver.maps.Map | null>,
  positions: [number, number][], // 여러 위치를 배열로 받음
  IconData: StaticImageData,
  isMarker: boolean,
  iconSize: { width: number; height: number } = { width: 32, height: 32 } // 디폴트값
) => {
  useEffect(() => {
    if (!mapRef.current) {
      console.log("아직 맵이 로드되지 않았습니다.");
      return;
    }

    const { naver } = window;

    if (!isMarker) {
      return;
    }

    const markers = positions.map((position) => {
      const markerPosition = new naver.maps.LatLng(position[0], position[1]);
      const iconUrl = IconData.src;

      return new naver.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
        icon: {
          url: iconUrl,
          size: new naver.maps.Size(iconSize.width, iconSize.height),
          scaledSize: new naver.maps.Size(iconSize.width, iconSize.height),
        },
      });
    });

    // 클린업 함수: 마커를 모두 제거
    return () => {
      markers.forEach((marker) => marker.setMap(null)); // 모든 마커를 제거
    };
  }, [mapRef, positions, isMarker]); // positions를 의존성 배열에 추가
};
