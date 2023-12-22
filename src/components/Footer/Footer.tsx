import { FooterContainer } from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer className="flex flex-col">
      <h5 className="font-medium">National Basketball Association</h5>

      <div className="mt-2 mb-10">
        <h6>16 York Street</h6>
        <h6>Toronto, Canada M5J 0E6</h6>
      </div>

      <p>Privacy Policy | Terms Of Use</p>
      <p>2023 © Rights Reserved</p>
      <p>by anvitrola</p>

    </FooterContainer>
  );
}
