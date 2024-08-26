//404 페이지, 예약어
import Image from "next/image";
import karxMax from "@/public/images/404karx.png";
export default function NotFound() {
  return (
    <>
      <h2>낫파운드</h2>
      <p>404</p>
      <Image src={karxMax} alt="404 이미지" layout="responsive" />
    </>
  );
}
