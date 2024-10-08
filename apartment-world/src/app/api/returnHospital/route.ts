import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (reqest: NextRequest) => {
  console.log("returnHospital 요청 왔습니다.");
  const region = reqest.nextUrl.searchParams.get("region");
  console.log("클라이언트에서 보낸 대가리값 리전", region);

  try {
    const response = await axios.get(
      "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire",
      {
        params: {
          serviceKey:
            "X2jd7M+DWV+lDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a+4c8n8QGw==",
          Q0: `${region}`,
          Q1: "",
          Qz: "A" && "B", //응급실 => 2차(B),3차(A)
          pageNo: 1,
          numOfRows: 30,
        },
      }
    );
    const data = response.data.response.body.items;
    const newArray = Object.values(data);
    console.log("대전광역시 응급실 정보", newArray);

    if (response.data !== null) {
      return NextResponse.json(newArray, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "에러가 발생했습니다." },
      { status: 500 }
    );
  }
};
