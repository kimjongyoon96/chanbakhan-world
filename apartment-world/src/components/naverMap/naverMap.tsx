"use client";
import { useState, useEffect } from "react";
import { useNaverMap } from "@/hooks/useNaverMap";
import { geoLocation } from "@/hooks/useGeoLocation";
// import { useNaverMarker } from "@/hooks/useNaverMarker";
import { useNaverMarkers } from "./naverLocation";
import redCircle from "@/public/images/image.png";
import hospital from "@/public/images/hospital_middle.png";
import { Modal } from "../modal/locationModal";
import ButtonWrapperComponent from "../\bnaverMapButton/MapButton";
import styles from "./index.module.scss";
import { mapReverseGeo } from "@/services/reverseGeo";
import { apiHospitalData } from "@/services/apiHospital";
import { useNaverFocus } from "@/hooks/useNaverFocus";
import { useNaverMarker } from "@/hooks/useNaverMarker";
const NaverMap = () => {
  const [center, setCenter] = useState([37.3595704, 127.105399]); // 사용자가 현재위치 거부했을때 default 위치
  const [zoomData, setZoomData] = useState(13); //zoom은 5km를 분기점으로 행정구역 표시로 가닥(5km이상일때는 다른 메시지 출력)
  const [clickView, setClickView] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [reverseGeo, setReverseGeo] = useState<undefined | string[]>(undefined);
  const [focusedCoords, setFocusedCoords] = useState<number[]>([0, 0]); // 동적으로 변경되는 지도중앙 위도경도
  const [hospitalData, setHospitalData] = useState<[number, number][]>([]);

  console.log("병원정보", hospitalData);
  const mapRef = useNaverMap("map", {
    center: center, // 초기 중심 좌표
    zoom: zoomData, // 초기 줌 레벨
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiHospitalData();
      let newArr = data?.map((sig) => {
        return [Number(sig.wgs84Lat), Number(sig.wgs84Lon)] as [number, number];
      });
      setHospitalData(newArr || []);
    };
    fetchData();
  }, []);
  useNaverMarker(mapRef, hospitalData!, hospital);
  //사용자가 드래그 했을떄, 뷰포트 기준으로 위도경도 추출
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapRef.current) {
      const handleCenterChange = () => {
        const center = mapRef.current?.getCenter() as naver.maps.LatLng;
        // console.log("현재 지도 중심 좌표:", center.lat(), center.lng());
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

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await geoLocation(); // 비동기 위치 정보 가져오기
      if (location.permission) {
        setCenter([location.lati!, location.long!]); // !을 사용, null |undefinded가 아님을 보장 (논리적으로 여기까지 오면 null일수없음)
      }
    };

    fetchLocation();
  }, [clickView]);
  const handleButtonClick = () => {
    useNaverMarkers(mapRef, center, redCircle);

    console.log("마커 생성 완료");
  };
  const handleButtonClickTwo = () => {
    console.log("두번째 버튼 눌러짐");
  };

  useEffect(() => {
    const fetchData = async () => {
      let rightGeoName = await mapReverseGeo(center);

      setReverseGeo(rightGeoName);
    };
    fetchData();
  }, [center]);

  const buttons = [
    { id: "button0", label: "+", onClick: handleButtonClick },
    { id: "button1", label: "ㅡ", onClick: handleButtonClick },
    { id: "button2", label: "현재위치", onClick: handleButtonClick },
    { id: "button3", label: "상급병원", onClick: handleButtonClickTwo },
    { id: "button4", label: "대전상급병원", onClick: apiHospitalData },

    // 더 많은 버튼들 추가
  ];
  return (
    <div className={styles.mapWrapper}>
      <Modal
        isOpen={isModal}
        children="현재위치에 동의하시겠습니까?"
        onClose={handleButtonClick}
        yesClick={handleButtonClick}
      />
      <div
        id="map"
        style={{ width: "864px", height: "1000px", position: "relative" }}
      />
      <ButtonWrapperComponent buttons={buttons} />
      <h2 className={styles.geoName}>{reverseGeo}</h2>
    </div>
  );
};

export default NaverMap;
