import dayjs from "dayjs";
import { userApi } from "shared/api/userApi";
import { useGetAllMeasurementsQuery } from "pages/currMeasuremetn/api/measurementsApi";
import { useParams } from "react-router-dom";

export const useMeasurementData = () => {
  const { curr } = useParams();
  const { data: userData } = userApi.useGetUserDataQuery();

  const { data: measurementsData = [] } = useGetAllMeasurementsQuery({
    id: userData.id,
    type: curr,
  });

  if (measurementsData.length === 0) return [];

  const sortedData = [...measurementsData].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  return sortedData.map((doc) => ({ ...doc, key: doc.date }));
};
