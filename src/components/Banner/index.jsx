import styled from "styled-components";
import CourseTitle from "../CourseTitle";

const BannerContainer = styled.section`
  width: 100%;
  height: auto;
  background-color: #6bd1ff;
  background-image: url("https://raw.githubusercontent.com/Diegodelias/challenge-one-aluraflix-latam/main/aluraflix/src/assets/Slider/slider1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  mix-blend-mode: multiply;
  box-shadow: inset 0px 0px 333px 75px #0b223f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  gap: 20px;

  @media (width > 1024px) {
    flex-direction: row-reverse;
    padding: 210px 28px;
    gap: 36px;
    align-items: flex-end;
  }
`;

const ImageContainer = styled.figure`
  position: relative;
  border-radius: 15px;
  width: 70%;
  overflow: hidden;

  @media (width > 1024px) {
    width: 459px;
    min-width: 459px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0px 0px 10px 8px #6bd1ff;
`;

const Image = styled.img`
  width: 100%;
`;

const TextContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 16px;
  color: var(--secondary-white);
  padding-bottom: 40px;

  @media (width > 1024px) {
    width: auto;
    gap: 67px;
    align-items: flex-start;
    padding-bottom: 0;
  }
`;

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;

  @media (width > 1024px) {
    font-size: 3.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  font-weight: 100;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <ImageContainer>
        <Image
          src="https://raw.githubusercontent.com/Diegodelias/challenge-one-aluraflix-latam/main/aluraflix/src/assets/thumbnails/bannerCard.png"
          alt=""
        />
        <Overlay />
      </ImageContainer>
      <TextContainer>
        <CourseTitle color="#6bd1ff">Front end</CourseTitle>
        <div>
          <Title>Challenge React</Title>
          <Description>
            <p>
              Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución
            </p>
            
            <p>
              de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
            </p>
          </Description>
        </div>
      </TextContainer>
    </BannerContainer>
  );
};

export default Banner;
