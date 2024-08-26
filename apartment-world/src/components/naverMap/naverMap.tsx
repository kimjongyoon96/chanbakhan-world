"use client";

import { useNaverMap } from "@/hooks/useNaverMap";
const NaverMap = () => {
  const mapRef = useNaverMap("map", {
    center: [37.3595704, 127.105399], // 초기 중심 좌표
    zoom: 10, // 초기 줌 레벨
  });
  console.log(mapRef, "왓이스초기정보");

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }} />
    </div>
  );
};

export default NaverMap;
