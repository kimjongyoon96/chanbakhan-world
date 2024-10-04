"use client";
import { useState, useEffect } from "react";
import { useNaverMap } from "@/hooks/useNaverMap";
import { useGeoLocation } from "@/hooks/useGeoLocation";
// import { useNaverMarker } from "@/hooks/useNaverMarker";
import { useNaverMarkers } from "./naverLocation";
import redCircle from "@/public/images/image.png";
import hospital from "@/public/images/hospital_middle.png";
import { Modal } from "../modal/locationModal";
import ButtonWrapperComponent from "../\bnaverMapButton/MapButton";
import styles from "./index.module.scss";
// import { mapReverseGeo } from "@/services/reverseGeo";
import { apiHospitalData } from "@/services/apiHospital";
import { useNaverFocus } from "@/hooks/useNaverFocus";
import { useNaverMarker } from "@/hooks/useNaverMarker";
import { useCenterChange } from "@/hooks/useCenterChange";
import { useReverseGeo } from "@/hooks/useReverseGeo";
import ChatComponent from "../socketChat/chat";
const NaverMap = () => {
  const [zoomData, setZoomData] = useState(13); //zoom은 5km를 분기점으로 행정구역 표시로 가닥(5km이상일때는 다른 메시지 출력)
  const [isModal, setIsModal] = useState(false);
  const [isOk, setisOk] = useState<number[]>([]);
  const [markerBoolean, setMarkerBoolean] = useState(true); // 병원 마커 조건 불리언 값
  const [reverseGeo, setReverseGeo] = useState<undefined | string[]>(undefined);
  const [hospitalData, setHospitalData] = useState<[number, number][]>([]);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [center, setCenter] = useState<number[]>([37.3595704, 127.105399]); // 사용자가 현재위치 거부했을때 default 위치
  const location = useGeoLocation(); // 훅을 통해 위치 정보를 가져옴
  const mapRef = useNaverMap("map", {
    center: center, // 초기 중심 좌표
    zoom: zoomData, // 초기 줌 레벨
  });

  //* 현재 위치좌표를 Array로 return 커스텀훅
  const detail = useCenterChange(mapRef);
  console.log(detail, "현재위치좌표");

  //* 현재위치의 위도경도를 상태변경함수로 변경 훅
  useEffect(() => {
    if (location[0].permission) {
      setCenter([location[0].lati!, location[0].long!]); // !을 사용해 null 또는 undefined가 아님을 보장
    }
  }, [location]);
  //* 위치정보를 매개변수로 받아서 변경되는 병원위치의 위도경도를 return
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiHospitalData("제주특별자치도");
      let newArr = data?.map((sig) => {
        return [Number(sig.wgs84Lat), Number(sig.wgs84Lon)] as [number, number];
      });
      setHospitalData(newArr || []);
    };
    fetchData();
  }, [mapRef.current, center]);
  /** 병원 마커 찍는 커스텀 훅 */
  const hospitalMarker = useNaverMarker(
    mapRef,
    hospitalData!,
    hospital,
    markerBoolean
  );
  //* 현재위치 행정동 string return 커스텀 훅
  const { locationData, error } = useReverseGeo(detail);

  //* 모달 오픈 함수
  const handleOpenModal = () => {
    if (!hasAgreed) {
      setIsModal(true);
    }
  };
  //* 모달 닫음 함수
  const handleClose = () => {
    setIsModal(false);
  };
  //* 모달 동의 함수, 현재위치에 마커 생성
  const handleButtonClick = () => {
    setIsModal(false);
    useNaverMarkers(mapRef, center, redCircle);
    setHasAgreed(true);
  };
  //* 지도 zoom 레벨 함수 + , -
  const handleButtonControler = (direction: string) => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      const newZoom = direction === "in" ? currentZoom + 1 : currentZoom - 1;
      mapRef.current.setZoom(newZoom);
    }
  };
  //* 마커 삭제-복귀 함수
  const handleMarkerExgist = () => {
    setMarkerBoolean((prevState) => !prevState);
  };

  const buttons = [
    { id: "button0", label: "+", onClick: () => handleButtonControler("in") },
    { id: "button1", label: "ㅡ", onClick: () => handleButtonControler("out") },
    { id: "button2", label: "현재위치", onClick: handleOpenModal },
    { id: "button3", label: "마커숨김", onClick: handleMarkerExgist },
    { id: "button4", label: "동네채팅", onClick: handleButtonClick },
  ];
  return (
    <div className={styles.mapWrapper}>
      <Modal
        isOpen={isModal}
        children="현재위치에 동의하시겠습니까?"
        onClose={handleClose}
        yesClick={handleButtonClick}
      />
      <div
        id="map"
        style={{ width: "864px", height: "100%", position: "relative" }}
      />
      <ButtonWrapperComponent buttons={buttons} />

      <h3 className={styles.geoName}>{locationData}</h3>
    </div>
  );
};

export default NaverMap;
