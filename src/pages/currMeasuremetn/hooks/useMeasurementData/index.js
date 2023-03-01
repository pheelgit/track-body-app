import dayjs from "dayjs";
import { userApi } from "shared/api/userApi";
import { useGetAllMeasurementsQuery } from "pages/currMeasuremetn/api/measurementsApi";
import { useParams } from "react-router-dom";

export const useMeasurementData = () => {
  const { curr } = useParams();
  const { data: userData } = userApi.useGetUserDataQuery();

  const { data: allMeasurements = [] } = useGetAllMeasurementsQuery({
    id: userData.id,
    type: curr,
  });

  if (allMeasurements.length === 0) return { measurementsData: [] };

  const sortedData = [...allMeasurements].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );
  const measurementsData = sortedData.map((doc) => ({ ...doc, key: doc.date }));

  return { measurementsData };
};
