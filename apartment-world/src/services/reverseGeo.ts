import { apiFe } from ".";
// interface ReverseGeoResponse {
//   results: {
//     region: {
//       area0: { name: string };
//       area1: { name: string };
//       area2: { name: string };
//       area3: { name: string };
//       area4: { name: string };
//     };
//     [key: string]: any;
//   }[];
// }

export const mapReverseGeo = async (
  centering: number[]
): Promise<undefined | string[]> => {
  try {
    console.log("TEST");
    const [latitude, longitude] = centering;
    // console.log("mapReverseGeo의 값", latitude, latitude);
    const response = await apiFe.get("/api/returnGeoMapData", {
      params: {
        coords: `${longitude},${latitude}`,
      },
    });

    let data = response.data.results[0].region;
    let newarr = Object.values(data).map((data: any) => data.name);

    console.log("쪼개기 전에 데이터를 확인해보자.", newarr);
    return newarr;
  } catch (error) {
    console.error("에러내용:", error);

    return undefined;
  }
};
