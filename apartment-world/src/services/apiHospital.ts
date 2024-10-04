import { json } from "stream/consumers";
import { apiFe } from ".";
export const apiHospitalData = async (
  region: string
): Promise<{ [key: string]: string }[] | undefined> => {
  try {
    const response = await apiFe.get("/api/returnHospital", {
      params: {
        name: "파라미터로 보낸값입니다.",
        region: region,
      },
    });

    const data = response.data;
    console.log("병원데이터에서 준 값인데 보자", data[0]);
    return data[0];
  } catch (error) {
    console.error("error발생했습니다.");
    return undefined;
  }
};
