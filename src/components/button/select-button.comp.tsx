import {
  SelectButtonContainer,
  SelectButtonImg,
  ButtonMainText,
  ButtonDescription,
} from "./select-button.styles";

interface Props {
  onClick: () => void;
  src: string;
  mainText: string;
  description: string;
}

const SelectButton = ({ onClick, mainText, description, src }: Props) => {
  return (
    <SelectButtonContainer onClick={onClick}>
      <SelectButtonImg src={src} alt="icon-button" />
      <div>
        <ButtonMainText>{mainText}</ButtonMainText>
        <ButtonDescription>{description}</ButtonDescription>
      </div>
    </SelectButtonContainer>
  );
};

export default SelectButton;
