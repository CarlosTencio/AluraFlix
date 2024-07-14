import { createContext, useEffect, useState } from "react";

export const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "tooShort",
  "tooLong",
  "patternMismatch",
];

export const validationMessages = {
  titulo: {
    valueMissing: "El campo título no puede estar vacío",
    tooShort: "El título debe tener al menos 3 caracteres",
  },
  categoria: {
    valueMissing: "El campo categoría no puede estar vacío",
  },
  imagen: {
    valueMissing: "El campo imagen no puede estar vacío",
    typeMismatch: "La imagen debe ser una URL válida",
    patternMismatch:
      "La URL de la imagen debe empezar con https://i.ytimg.com/vi/ y provenir de YouTube",
  },
  video: {
    valueMissing: "El campo video no puede estar vacío",
    typeMismatch: "El video debe ser una URL válida",
    patternMismatch:
      "La URL del video debe provenir de YouTube con la siguiente estructura: https://www.youtube.com/watch?v=",
  },
  descripcion: {
    valueMissing: "El campo descripción no puede estar vacío",
    tooShort: "La descripción debe tener al menos 3 caracteres",
    tooLong: "La descripción ha alcanzado su longitud máxima",
  },
};

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/CarlosTencio/videos-api/categorias"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/CarlosTencio/videos-api/videos"
    )
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const deleteVideo = (id) => {
    fetch(
      `https://my-json-server.typicode.com/CarlosTencio/videos-api/videos/${id}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el video");
        }

        return res.json();
      })
      .then(() => {
        const updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
        showPopup("video eliminado con éxito", "success");
      })
      .catch((err) => {
        console.error("Error: ", err);
        showPopup(`Hubo un problema al eliminar el video: ${err}`, "error");
      });
  };

  const updateVideoInfo = (data) => {
    const { title, category, image, videoLink, description, id } = data;

    const updatedVideo = {
      titulo: title,
      Categoria: category,
      linkImagenVideo: image,
      linkVideo: videoLink,
      descripcion: description,
    };

    fetch(
      `https://my-json-server.typicode.com/CarlosTencio/videos-api/videos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      }
    )
      .then((res) => res.json())
      .then((updatedVideoFromServer) => {
        const updatedVideos = videos.map((video) =>
          video.id === id ? updatedVideoFromServer : video
        );
        setVideos(updatedVideos);
        showPopup("video Actualizado con éxito", "success");
      })
      .catch((err) => {
        console.error("Error: ", err);
        showPopup(`Hubo un problema al actualizar el video: ${err}`, "error");
      });
  };

  const createNewVideo = (data) => {
    let newId = 1;
    while (videos.some((video) => newId === video.id)) {
      newId++;
    }

    const infoToSend = {
      Categoria: data.category,
      descripcion: data.description,
      linkVideo: data.videoLink,
      linkImagenVideo: data.image,
      titulo: data.title,
      id: newId,
    };

    fetch(
      `https://my-json-server.typicode.com/CarlosTencio/videos-api/videos`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(infoToSend),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al crear el video");
        }
        return res.json();
      })
      .then((newVideo) => {
        setVideos([...videos, newVideo]);
        showPopup(`Se ha agregado con éxito el video: ${newVideo.titulo}`, "success");
      })
      .catch((err) => {
        console.error("Error:", err);
        showPopup(`Hubo un problema al agregar el video: ${err}`, "error");
      });
  };

  const clearInputs = () => {
    setTitle("");
    setCategory("");
    setImage("");
    setVideoLink("");
    setDescription("");
    setIsFormValid(false);
  };

  const verifyField = (field) => {
    let message = "";

    field.setCustomValidity("");

    errorTypes.forEach((error) => {
      if (field.validity[error]) {
        message = validationMessages[field.name][error] || "Campo inválido";
      }
    });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [field.name]: message,
    }));
  };

  const [formFields, setFormFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allValid = Object.values(formFields).every(
      (field) => field.validity.valid
    );
    setIsFormValid(allValid);
  }, [formFields]);

  const handleInputChange = (name, value) => {
    const updatedFields = {
      ...formFields,
      [name]: {
        ...formFields[name],
        value: value,
        validity: document.querySelector(`[name=${name}]`).validity,
      },
    };
    setFormFields(updatedFields);

    switch (name) {
      case "titulo":
        setTitle(value);
        break;
      case "categoria":
        setCategory(value);
        break;
      case "imagen":
        setImage(value);
        break;
      case "video":
        setVideoLink(value);
        break;
      case "descripcion":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <GlobalContext.Provider
      value={{
        title,
        image,
        category,
        videoLink,
        description,
        videos,
        categories,
        selectedVideo,
        popup,
        errorMessages,
        isFormValid,
        handleInputChange,
        setSelectedVideo,
        setCategory,
        deleteVideo,
        updateVideoInfo,
        createNewVideo,
        clearInputs,
        verifyField,
        setErrorMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
