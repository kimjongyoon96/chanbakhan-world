import { apiFe } from ".";

export const apiHospitalData = async (): Promise<
  { str: { [key: string]: string } }[] | undefined
> => {
  try {
    const response = await apiFe.get("/api/returnHospital", {
      params: {
        name: "파라미터로 보낸값입니다.",
      },
    });

    const data = await response.data;
    let newArr = data;
    console.log(newArr, "api/returnHospital에 대한 응답입니다.");

    return data;
  } catch (error) {
    console.error("error발생했습니다.");
    return undefined;
  }
};
