const { useState } = require("react");
const { useDatesToSelect } = require("shared/hooks/useDatesToSelect");

export const useChanges = () => {
  const { arrToSelect, allPhotos } = useDatesToSelect();

  const [firstSelect, setFirstSelect] = useState({ current: "" });
  const [secondSelect, setSecondSelect] = useState({
    values: [],
    current: "",
    disabled: true,
  });
  const [typeSelect, setTypeSelect] = useState({
    values: [],
    disabled: true,
    current: "",
  });

  const [showEqualModal, setShowEqualModal] = useState(false);
  const [compareImgagesUrls, setCompareImgagesUrls] = useState({
    left: "",
    right: "",
  });

  const handleChangeFirstDate = (firstValue) => {
    setSecondSelect({ values: [], current: "", disabled: true });
    setTypeSelect({ values: [], current: "", disabled: true });
    setFirstSelect({ current: firstValue });

    const secondValues = [...arrToSelect].filter(
      ({ value }) => value !== firstValue
    );
    setSecondSelect((prev) => ({
      ...prev,
      disabled: false,
      values: secondValues,
    }));
  };

  const handleChangeSecondDate = (secondValue) => {
    setSecondSelect((prev) => ({ ...prev, current: secondValue }));

    const firstTypes = allPhotos[firstSelect.current];
    const secondTypes = allPhotos[secondValue];

    const firstDates = firstTypes.map((type) => Object.keys(type)[0]);
    const secondDates = secondTypes.map((type) => Object.keys(type)[0]);

    const equalTypes = firstDates.filter((date) => secondDates.includes(date));
    console.log(equalTypes);

    const equalsSelect = equalTypes.map((type) => ({
      value: type,
      label: type,
    }));
    console.log(equalsSelect);

    setTypeSelect((prev) => ({
      ...prev,
      values: equalsSelect,
      disabled: false,
    }));
  };

  const handleChangeTypeSelect = (type) => {
    const firstUrl = allPhotos[firstSelect.current].find(
      (e) => Object.keys(e)[0] === type
    )[type];
    const secondUrl = allPhotos[secondSelect.current].find(
      (e) => Object.keys(e)[0] === type
    )[type];

    setCompareImgagesUrls((prev) => ({
      ...prev,
      left: firstUrl,
      right: secondUrl,
    }));

    setShowEqualModal(true);
  };

  return {
    arrToSelect,
    firstSelect,
    secondSelect,
    typeSelect,
    showEqualModal,
    setShowEqualModal,
    compareImgagesUrls,
    handleChangeFirstDate,
    handleChangeSecondDate,
    handleChangeTypeSelect,
  };
};
