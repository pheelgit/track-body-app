import { useSearchParams } from "react-router-dom";

export const useShowSideBar = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const openSideBar = () => {
    searchParams.append("openSideBar", "true");
    setSearchParams(searchParams);
  };

  const closeSideBar = () => {
    searchParams.delete("openSideBar");
    setSearchParams(searchParams);
  };

  const openSecondSideBar = (child) => {
    if (!child) {
      return;
    }
    searchParams.append("openSecondSideBar", "true");
    searchParams.append("childForSecondSideBar", child);
    setSearchParams(searchParams);
  };

  const closeSecondSideBar = () => {
    searchParams.delete("openSecondSideBar");
    searchParams.delete("childForSecondSideBar");
    setSearchParams(searchParams);
  };

  const CHILDREN_FOR_SECOND_SIDEBAR = {
    bodyInfo: "bodyInfo",
  };

  return {
    openSideBar,
    closeSideBar,
    openSecondSideBar,
    closeSecondSideBar,
    CHILDREN_FOR_SECOND_SIDEBAR,
  };
};
