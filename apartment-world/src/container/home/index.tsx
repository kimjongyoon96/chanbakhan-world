import style from "./index.module.scss";
import Map from "../naverMap/naver_map_client";
import NaverMap from "@/components/naverMap/naverMap";
const Home = async () => {
  return (
    <main>
      <div>
        <NaverMap />
      </div>
    </main>
  );
};

export default Home;
