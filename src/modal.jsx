import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Logo from "./logo.svg";

export const Modal_Component_Create = ({
  showMC,
  handleCloseMC,
  character,
  setCharacter,
  addCharacter,
  handleChangeImage,
  changeImage,
  prewImage,
}) => {
  return (
    <>
      <Modal show={showMC} onHide={handleCloseMC}>
        <Modal.Header closeButton>
          <Modal.Title>Create </Modal.Title>
        </Modal.Header>

        <div className="containerLogo">
          <img
            src={changeImage == false ? Logo : prewImage}
            alt="Logo"
            style={{ width: "200px", height: "150px", objectFit: "contain" }}
          />
        </div>

        <div className="containterButtonUpload">
          <input
            className="btn btn-warning"
            type="file"
            onChange={handleChangeImage}
          />
        </div>

        <Modal.Body>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            className="form-control"
            value={character.name}
            onChange={(e) =>
              setCharacter({ ...character, name: e.target.value })
            }
          />
          <label htmlFor="Clan">Clan</label>
          <input
            type="text"
            placeholder="Clan"
            name="Clan"
            className="form-control"
            value={character.clan}
            onChange={(e) =>
              setCharacter({ ...character, clan: e.target.value })
            }
          />
          <label htmlFor="Age">Age</label>
          <input
            type="number"
            placeholder="Age"
            name="Age"
            className="form-control"
            value={character.age}
            onChange={(e) =>
              setCharacter({ ...character, age: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMC}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addCharacter()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//================================================================================================

export const Modal_Component_Edit = ({
  showME,
  handleCloseME,
  character,
  setCharacter,
  editCharacter,
}) => {
  const [image, setImage] = useState("");
  const [changeImage, setChangeImage] = useState(false);

  // const handleChange = (e) => {
  //   setChangeImage(true);
  //   setImage((images) => [...images, URL.createObjectURL(e.files[0])]);
  //   return URL.revokeObjectURL(e.files[0]);
  // };
  return (
    <>
      <Modal show={showME} onHide={handleCloseME}>
        <Modal.Header closeButton>
          <Modal.Title>Edit </Modal.Title>
        </Modal.Header>

        <div className="containerImageCharacter">
          <img src={character.image} alt="Logo" className="imageCharacter" />
        </div>

        <div className="containterButtonUpload">
          <input
            className="btn btn-warning"
            type="file"
            //onChange={(e) => handleChange(e.target)}
          />
        </div>

        <Modal.Body>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            className="form-control"
            value={character.name}
            onChange={(e) =>
              setCharacter({ ...character, name: e.target.value })
            }
          />
          <label htmlFor="Clan">Clan</label>
          <input
            type="text"
            placeholder="Clan"
            name="Clan"
            className="form-control"
            value={character.clan}
            onChange={(e) =>
              setCharacter({ ...character, clan: e.target.value })
            }
          />
          <label htmlFor="Age">Age</label>
          <input
            type="number"
            placeholder="Age"
            name="Age"
            className="form-control"
            value={character.age}
            onChange={(e) =>
              setCharacter({ ...character, age: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseME}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editCharacter()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
