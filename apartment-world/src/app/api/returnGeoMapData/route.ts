import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  coords: string;
  order: string;
  output: string;
}
export const GET = async (req: NextRequest) => {
  console.log("returnGeoMapData 요청 옴");
  const coords = req.nextUrl.searchParams.get("coords");
  console.log("coords조회:", coords);
  let latitude, longitude;

  if (coords) {
    [longitude, latitude] = coords.split(",");
  } else {
    return NextResponse.json(
      { message: "coords 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc",
      {
        params: {
          request: "coordsToaddr",
          coords: `${longitude},${latitude}`,
          orders: "admcode,roadaddr,addr",
          output: "json",
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NAVER_SECRET_PW,
        },
      }
    );

    console.log("데이터조회", response.data);
    console.log("요청이 가긴 한다");
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    if (error.response) {
      console.error("Error Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    }
    return NextResponse.json(
      { message: "서버 오류 발생, 확인하세요" },
      { status: 500 }
    );
  }
};
// https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=127.4350295,36.3475174&sourcecrs=epsg:4326&orders=admcode,roadaddr,addr&output=json
