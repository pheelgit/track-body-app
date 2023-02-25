import { storage } from "app/dataBase/firebaseAppDb";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const addPhoto = async (payload) => {
  const storageRef = ref(
    storage,
    `${payload.id}/${payload.date}/${payload.type}`
  );
  const snap = await uploadBytes(storageRef, payload.image);
  const url = await getDownloadURL(snap.ref);
  return url;
};

const photoService = {
  add: addPhoto,
};

export default photoService;
