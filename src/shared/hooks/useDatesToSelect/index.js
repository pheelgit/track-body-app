import dayjs from "dayjs";
import { useGetAllPhotosQuery } from "pages/photo/api/photoApi";
import { userApi } from "shared/api/userApi";

export const useDatesToSelect = () => {
  const { data: UserInfo } = userApi.useGetUserDataQuery();
  const { data: allPhotos = {} } = useGetAllPhotosQuery(UserInfo.id);

  const dates = Object.keys(allPhotos);

  if (dates.length === 0) {
    return { allPhotos, arrToSelect: [] };
  }

  const arrToSelect = dates.map((date) => ({
    value: date,
    label: date,
  }));
  arrToSelect.sort(
    (a, b) => dayjs(b.value).valueOf() - dayjs(a.value).valueOf()
  );
  return { allPhotos, arrToSelect };
};
