import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//* 네이버지도를 서버사이드에서 클라이언트에게 보낸다.
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
