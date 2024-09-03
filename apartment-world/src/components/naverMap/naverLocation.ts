import { StaticImageData } from "next/image";

//** 현재 위치의 마커를 return 하는 함수 ,hook도 아니고, naverMap 조건부에만 쓰기때문에 일단 근처에 추후 조정*/
export const useNaverMarkers = (
  mapRef: React.MutableRefObject<any>,
  position: number[],
  IconData: StaticImageData,
  iconSize: { width: number; height: number } = { width: 32, height: 32 } // 디폴트값, 호출할떄 쓸수있음
) => {
  if (!mapRef) {
    console.log("아직 맵이 로드되지 않았습니다.");
    return null;
  }
  const { naver } = window;
  console.log("네이버 객체:", naver);

  const markerPosition = new naver.maps.LatLng(position[0], position[1]);
  const iconUrl = IconData.src;

  if (naver && naver.maps) {
    const newMarker = new naver.maps.Marker({
      position: markerPosition,
      map: mapRef.current,
      icon: {
        url: iconUrl,
        size: new naver.maps.Size(iconSize.width, iconSize.height),
        scaledSize: new naver.maps.Size(iconSize.width, iconSize.height),
      },
    });
    console.log("마커 생성 위치:", markerPosition);
    return newMarker; // 생성된 마커 반환
  } else {
    console.log("네이버 지도 API가 로드되지 않았습니다.");
    return null;
  }
};
