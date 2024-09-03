import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//* new naver 클래스에 접근할수있게 api 스크립트 return
export const GET = async (request: NextApiRequest, res: NextApiResponse) => {
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

  if (!naverClientId) {
    return res
      .status(500)
      .json({ error: "환경변수에 네이버 지도 아이디가 없습니다." });
  }

  const scriptTag = `
  <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverClientId}&submodules=geocoder"></script>
`;

  return new NextResponse(scriptTag, {
    headers: { "Content-Type": "text/html" },
  });
};
