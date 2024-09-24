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
const NaverMap = () => {
  const [zoomData, setZoomData] = useState(13); //zoom은 5km를 분기점으로 행정구역 표시로 가닥(5km이상일때는 다른 메시지 출력)
  const [isModal, setIsModal] = useState(false);
  const [isOk, setisOk] = useState<number[]>([]);
  const [markerBoolean, setMarkerBoolean] = useState(true); // 병원 마커 조건 불리언 값
  const [reverseGeo, setReverseGeo] = useState<undefined | string[]>(undefined);
  const [hospitalData, setHospitalData] = useState<[number, number][]>([]);
  const [hasAgreed, setHasAgreed] = useState(false);
  const location = useGeoLocation(); // 훅을 통해 위치 정보를 가져옴
  const [center, setCenter] = useState<number[]>([37.3595704, 127.105399]); // 사용자가 현재위치 거부했을때 default 위치
  const mapRef = useNaverMap("map", {
    center: center, // 초기 중심 좌표
    zoom: zoomData, // 초기 줌 레벨
  });
  /** detail=> 현재 위치좌표 출력 */
  const detail = useCenterChange(mapRef);
  console.log("TEST", detail);
  const handleClose = () => {
    setIsModal(false);
  };
  useEffect(() => {
    if (location[0].permission) {
      setCenter([location[0].lati!, location[0].long!]); // !을 사용해 null 또는 undefined가 아님을 보장
    }
  }, [location]);
  const { locationData, error } = useReverseGeo(detail);
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
  useNaverMarker(mapRef, hospitalData!, hospital, markerBoolean);
  const handleOpenModal = () => {
    if (!hasAgreed) {
      setIsModal(true);
    }
  };
  const handleButtonClick = () => {
    setIsModal(false);
    useNaverMarkers(mapRef, center, redCircle);
    setHasAgreed(true);
  };
  const handleButtonControler = (direction: string) => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      const newZoom = direction === "in" ? currentZoom + 1 : currentZoom - 1;
      mapRef.current.setZoom(newZoom);
    }
  };
  const handleMarkerExgist = () => {
    setMarkerBoolean((prevState) => !prevState);
  };

  const buttons = [
    { id: "button0", label: "+", onClick: () => handleButtonControler("in") },
    { id: "button1", label: "ㅡ", onClick: () => handleButtonControler("out") },
    { id: "button2", label: "현재위치", onClick: handleOpenModal },
    { id: "button4", label: "대전상급병원", onClick: apiHospitalData },
    { id: "button5", label: "마커숨김", onClick: handleMarkerExgist },
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
