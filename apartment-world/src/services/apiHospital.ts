import { json } from "stream/consumers";
import { apiFe } from ".";
export const apiHospitalData = async (): Promise<
  { [key: string]: string }[] | undefined
> => {
  try {
    const response = await apiFe.get("/api/returnHospital", {
      params: {
        name: "파라미터로 보낸값입니다.",
      },
    });

    const data = response.data;
    console.log(data[0]);
    return data[0];
  } catch (error) {
    console.error("error발생했습니다.");
    return undefined;
  }
};
