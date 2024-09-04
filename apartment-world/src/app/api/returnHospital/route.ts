import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (reqest: NextRequest) => {
  console.log("returnHospital 요청 왔습니다.");
  try {
    const response = await axios.get(
      "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire",
      {
        params: {
          serviceKey:
            "X2jd7M+DWV+lDWgBze1Q8cZhiKbQwYt76Y6lPyWLcWneJ6IbrS38qgsEBaI0ALTWSl3jslpsdW50a+4c8n8QGw==",
          Q0: "대전광역시",
          Q1: "",
          Qz: "A" && "B", //응급실 => 2차(B),3차(A)
          pageNo: 1,
          numOfRows: 10,
        },
      }
    );
    const data = response.data.response.body.items;
    console.log("대전광역시 응급실 정보", data);

    if (response.data !== null) {
      return NextResponse.json({ mesage: "잘받았다이거야" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "에러가 발생했습니다." },
      { status: 500 }
    );
  }
};
