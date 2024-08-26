"use client";
import { useEffect } from "react";
import styles from "./index.module.scss";
const Map = () => {
  useEffect(() => {
    console.log(
      "NEXT_PUBLIC_NAVER_CLIENT_ID:",
      process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
    );
    // 네이버 지도 API가 로드된 후에만 이 코드가 실행됩니다.
    if (window.naver && window.naver.maps) {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      });
      console.log("네이버 지도 초기화 완료");
    } else {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
    }
  }, []);

  return (
    <div>
      <h1>홈페이지</h1>
      <div id="map" style={{ width: "100%", height: "1000px" }}></div>
    </div>
  );
};

export default Map;
