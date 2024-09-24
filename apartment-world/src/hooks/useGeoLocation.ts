"use client";
/** 사용자의 현재 위치의 위도경도를 반환하는 커스텀훅 */
import { permission } from "process";
import { useState, useEffect } from "react";
interface GeoLocationResult {
  lati?: number;
  long?: number;
  permission: boolean;
}
/**geoLocation을 사용해서 현재 위도경도를 retrun하는 커스텀 훅 */
export const useGeoLocation = (): GeoLocationResult[] => {
  const [location, setLocation] = useState<GeoLocationResult[]>([
    { lati: undefined, long: undefined, permission: false },
  ]);
  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lati = position.coords.latitude;
            const long = position.coords.longitude;
            setLocation([{ lati, long, permission: true }]);
          },
          (error) => {
            console.error("위치 정보를 가져오는데 실패했습니다.", error);
            setLocation([{ permission: false }]);
          }
        );
      } else {
        console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
        setLocation([{ permission: false }]);
      }
    };

    fetchLocation();
  }, []);

  return location;
};
