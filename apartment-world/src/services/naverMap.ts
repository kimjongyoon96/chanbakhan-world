declare global {
  interface Window {
    naver: any;
    initMap: () => void;
  }
}

const loadNaverMapScript = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById("naver-map-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&callback=initMap`;
    script.onload = () => resolve();
    script.onload = () => {
      if (window.naver && window.naver.maps) {
        resolve();
        console.log(window.naver, "네이버가 있습니다.");
      } else {
        reject(new Error("자바스크립트 로드 실패"));
      }
    };
    script.onerror = () =>
      reject(
        new Error("네이버 지도 스크립트를 로드하는 중 오류가 발생했습니다.")
      );
    document.head.appendChild(script);
  });
};

window.initMap = () => {
  if (window.naver && window.naver.maps) {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
    console.log("지도 초기화 완료");
  } else {
    console.error("아직 네이버 지도 API가 로드되지 않았습니다.");
  }
};

export const naverMapData = async (): Promise<{ status: string }> => {
  await loadNaverMapScript();
  return {
    status: "ok",
  };
};
