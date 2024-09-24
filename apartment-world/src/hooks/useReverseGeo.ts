"use client";
import { useState, useEffect } from "react";
import { apiFe } from "@/services";

export const useReverseGeo = (centering: number[]) => {
  const [locationData, setLocationData] = useState<string[] | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latitude, longitude] = centering;

        const response = await apiFe.get("/api/returnGeoMapData", {
          params: {
            coords: `${longitude},${latitude}`,
          },
        });
        const data = response.data.results[0].region;
        const newArr = Object.values(data)
          .slice(1, Object.values(data).length - 1)
          .map((data: any) => data.name);

        setLocationData(newArr); // 상태로 데이터 저장
      } catch (error) {
        console.error("에러 발생:", error);
        setError("데이터를 불러오는 중 문제가 발생했습니다."); // 에러 상태 저장
      }
    };

    fetchData();
  }, [centering]);

  return { locationData, error }; // 데이터를 반환
};
