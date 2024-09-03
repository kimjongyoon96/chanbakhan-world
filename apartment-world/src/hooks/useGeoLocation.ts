"use client";

interface GeoLocationResult {
  lati?: number;
  long?: number;
  permission: boolean;
}
export const geoLocation = (): Promise<GeoLocationResult> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("위도:", position.coords.latitude);
          console.log("경도:", position.coords.longitude);
          let lati = position.coords.latitude;
          let long = position.coords.longitude;
          resolve({ lati, long, permission: true });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다.", error);
          resolve({ permission: false });
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
      resolve({ permission: false });
    }
  });
};
