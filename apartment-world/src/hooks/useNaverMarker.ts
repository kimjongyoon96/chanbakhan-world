"use client";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
declare global {
  interface Window {
    naver: any;
  }
}
//* default or useGeolocation 라따 롱따 받아서 위치 찍는 함수
export const useNaverMarker = (
  mapRef: React.MutableRefObject<any>,
  position: number[],
  IconData: StaticImageData
) => {
  const [marker, setMarker] = useState<any>(null); // 마커 상태 관리
  useEffect(() => {
    console.log("useEffect started"); // useEffect 시작 시 로그 출력

    if (!mapRef.current) {
      console.log("Map reference not set", mapRef.current);
      return;
    }

    const { naver } = window;
    console.log(
      "스크립트가 로드가되었다면 떠야하는 winodw객체의 프로퍼티 네이버:",
      naver
    );
    const markerPosition = new naver.maps.LatLng(position[0], position[1]);
    const iconUrl = IconData.src;

    if (marker) {
      marker.setMap(null);
    }
    if (naver && naver.maps) {
      const newMarker = new naver.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
        icon: iconUrl,
      });
      console.log("Marker created at:", markerPosition);
      setMarker(newMarker);
    } else {
      console.log("지도 ref가 반환되지 않았습니다. ");
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [mapRef.current, position]); // mapRef.current와 position이 변경될 때마다 실행

  return marker; // 마커 객체를 반환하여 필요 시 외부에서 접근 가능하게 함
};

//1. 응급실 정보 api
// http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire?serviceKey=X2jd7M%2BDWV%2BlDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a%2B4c8n8QGw%3D%3D&STAGE1=서울특별시&STAGE2=&pageNo=1&numOfRows=10

// http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire?serviceKey=X2jd7M%2BDWV%2BlDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a%2B4c8n8QGw%3D%3D&STAGE1=서울특별시&STAGE2=강남구&SM_TYPE=1&pageno=1&numOfRows=10

//3. 응급실 기본 정보 조회
// http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytBassInfoInqire?serviceKey=X2jd7M%2BDWV%2BlDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a%2B4c8n8QGw%3D%3D
// // 2. 개인 병원 api
// http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey=X2jd7M%2BDWV%2BlDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a%2B4c8n8QGw%3D%3D&Q0=대전광역시&Q1=동구&QZ=B&QD=D001&QT=1&QN=대전한국병원&ORD=NAME&pageNo=1&numOfRows=10
