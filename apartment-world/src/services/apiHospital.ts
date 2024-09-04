import { apiFe } from ".";

export const apiHospitalData = async (): Promise<undefined | string> => {
  try {
    const response = await apiFe.get("/api/returnHospital", {
      params: {
        name: "파라미터로 보낸값입니다.",
      },
    });

    const data = await response.data;

    console.log(data, "api/returnHospital에 대한 응답입니다.");
    return data;
  } catch (error) {
    console.error("error발생했습니다.");
    return undefined;
  }
};
