import styled from "styled-components";
import EditButton from "./EditButton";
import deleteIcon from "./borrar.png";
import editIcon from "./editar.png";
import { useContext } from "react";
import { GlobalContext } from "../../context/Context";

const Container = styled.article`
  width: 374px;
  min-width: 374px;
  height: 278px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 430px;
    min-width: 430px;
    height: 318px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0px 0px 10px 4px ${(props) => props.color};
  pointer-events: none;
`;

const Image = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 52px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 4px solid ${(props) => props.color};
`;

const Card = ({ color, video }) => {
  const { linkImagenVideo, titulo } = video;
  const { setSelectedVideo, deleteVideo } = useContext(GlobalContext);

  return (
    <Container>
      <Image src={linkImagenVideo} alt={titulo} />
      <ActionsContainer color={color}>
        <EditButton action={deleteVideo} video={video} img={deleteIcon}>
          Borrar
        </EditButton>
        <EditButton action={setSelectedVideo} video={video} img={editIcon}>
          Editar
        </EditButton>
      </ActionsContainer>
      <Overlay color={color} />
    </Container>
  );
};

export default Card;
