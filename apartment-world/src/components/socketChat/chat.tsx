"use client";
interface props {
  center: string | undefined;
  lati: number;
  longti: number;
}
const ChatComponent = (getCenter: string) => {
  //* 매개변수로 center(현재위치,문자열)를 받는다.
  //* 받은 center의 값을 통해 소켓 연결대상을 판단한다.
  //* 이 컴포넌트는 naverMaps에 종속되어있다.
  return (
    <main>
      <div>여기는 채팅방</div>
    </main>
  );
};

export default ChatComponent;
