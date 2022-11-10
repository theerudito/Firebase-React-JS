import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap/esm";
import { DB, Storage } from "./firebase";
import { Modal_Component_Create } from "./modal";
import { Modal_Component_Edit } from "./modal";
import "./style.scss";

function App() {
  // CONSTAS DATA TO FIREBASE ==================================================
  const dataFirebase = collection(DB, "naruto");
  const [data, setData] = useState([]);
  const [showMC, setShowMC] = useState(false);
  const [showME, setShowME] = useState(false);
  const [dataCharacter, setDataCharacter] = useState({});
  const [character, setCharacter] = useState({
    name: "",
    clan: "",
    age: "",
  });
  // CONSTAS DATA TO FIREBASE ==================================================

  // CONSTAS UPLOAD IMAGE TO FIREBASE ==========================================
  const [imageUpLoad, setImageUpLoad] = useState(null);
  const bucketFirebase = ref(Storage, `naruto/`);
  const generateID = Math.random().toString(20).substr(2, 9);
  const [changeImage, setChangeImage] = useState(false);
  const [prewImage, setprewImage] = useState(null);
  // CONSTAS UPLOAD IMAGE TO FIREBASE ==========================================

  const handleCloseMC = () => setShowMC(false);
  const handleShowMC = () => setShowMC(true);

  const handleCloseME = () => setShowME(false);
  const handleShowME = () => setShowME(true);

  // GET DATA FROM FIREBASE ====================================================
  const fetchData = async () => {
    const data = await getDocs(dataFirebase)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        return data;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    setData(data);
  };
  // GET DATA FROM FIREBASE ====================================================

  useEffect(() => {
    fetchData();
  }, []);

  // ADD DATA TO FIREBASE ======================================================
  const addCharacter = async () => {
    if (imageUpLoad === null) return;

    const imageRef = ref(bucketFirebase, `${generateID}`);

    uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
      console.log("Uploaded complete!");
      getDownloadURL(imageRef).then(async (url) => {
        new Promise((resolve, reject) => {
          resolve(
            setDoc(doc(dataFirebase), {
              name: character.name,
              clan: character.clan,
              age: character.age,
              refImage: generateID,
              image: url,
            })
          );
          handleCloseMC();
          setCharacter(character);
          fetchData();
        });
      });
    });
  };

  // ADD DATA TO FIREBASE ======================================================

  // DELETE CHARACTER AND IMAGE FROM FIREBASE =================================
  const deleteCharacter = (item) => {
    const idCharacter = item.id;
    // delete character from firebase
    const userDoc = doc(dataFirebase, idCharacter);
    deleteDoc(userDoc);

    // borrar imagen de firebase
    const imageRef = ref(bucketFirebase, `${item.refImage}`);
    deleteObject(imageRef);
    fetchData();
  };
  // DELETE CHARACTER AND IMAGE FROM FIREBASE =================================

  // EDIT CHARACTER AND IMAGE FROM FIREBASE ===================================
  const editCharacterModal = async (item) => {
    handleShowME();
    setCharacter(item);
    setDataCharacter(item);
  };

  const changeImageEdit = (e) => {
    setChangeImage(true);
  };

  const editCharacter = async () => {
    const idCharacter = dataCharacter.id;
    if (changeImage === true) {
      const imageRef = ref(bucketFirebase, generateID);
      uploadBytes(imageRef, imageUpLoad).then((snapshot) => {
        console.log("Uploaded complete!");
        getDownloadURL(imageRef).then(async (url) => {
          new Promise((resolve, reject) => {
            const imageRef = ref(bucketFirebase, `${dataCharacter.refImage}`);
            deleteObject(imageRef);
            resolve(
              setDoc(doc(dataFirebase, idCharacter), {
                name: character.name,
                clan: character.clan,
                age: character.age,
                refImage: generateID,
                image: url,
              })
            );
            handleCloseME();
            setCharacter(character);
            fetchData();
          });
        });
      });
    } else {
      const userDoc = doc(dataFirebase, idCharacter);
      await setDoc(userDoc, {
        name: character.name,
        clan: character.clan,
        age: character.age,
        refImage: dataCharacter.refImage,
        image: dataCharacter.image,
      });
      handleCloseME();
      setCharacter(character);
      fetchData();
    }

  };
  // EDIT CHARACTER AND IMAGE FROM FIREBASE ===================================

  // PREVIEW IMAGE ============================================================
  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    if (selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImageUpLoad(selectedImage);
        setChangeImage(true);
        setprewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      alert("file not supported");
    }
  };
  // PREVIEW IMAGE ============================================================

  const handleChangeImageEdit = (e) => {
    const selectedImage = e.target.files[0];

    const ALLOWED_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    if (selectedImage && ALLOWED_TYPES.includes(selectedImage.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImageUpLoad(selectedImage);
        setChangeImage(true);
        setprewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      alert("file not supported");
    }
  };

  return (
    <div className="App">
      <div className="containerButtonAdd">
        <Button variant="primary" onClick={() => handleShowMC()}>
          ADD
        </Button>
      </div>

      <div className="containerCard">
        {data.map((item) => (
          <div className="card" style={{ width: "18rem" }} key={item.id}>
            <img src={item.image} className="card-img-top" alt="pinture" />
            <div className="card-body">
              <h5 className="card-title">Name: {item.name} </h5>
              <p className="card-text">Clan: {item.clan}</p>
              <p className="card-text">Age: {item.age} </p>

              <div className="containerActions">
                <button
                  className="btn btn-success"
                  onClick={() => editCharacterModal(item)}
                >
                  EDIT
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCharacter(item)}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal_Component_Create
        setShowMC={setShowMC}
        showMC={showMC}
        handleCloseMC={handleCloseMC}
        setCharacter={setCharacter}
        character={character}
        addCharacter={addCharacter}
        imageUpLoad={imageUpLoad}
        changeImage={changeImage}
        handleChangeImage={handleChangeImage}
        prewImage={prewImage}
      />

      <Modal_Component_Edit
        setShowME={setShowME}
        showME={showME}
        handleCloseME={handleCloseME}
        setCharacter={setCharacter}
        character={character}
        addCharacter={addCharacter}
        editCharacter={editCharacter}
        dataCharacter={dataCharacter}
        handleChangeImageEdit={handleChangeImageEdit}
        changeImageEdit={changeImageEdit}
        prewImage={prewImage}
        changeImage={changeImage}
      />
    </div>
  );
}

export default App;
