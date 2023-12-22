import { BannerContainer, ScrollContentContainer, ScrollDownLine } from "./Banner.styles";

export default function Banner() {
  return (
    <BannerContainer>
      <video playsInline muted autoPlay loop>
        <source
          src="https://assets.website-files.com/611151d2308094b62cb7a988/6131af917e33fe64e1f0ba22_123-transcode.mp4"
          data-wf-ignore={true}
        />
      </video>

      <ScrollContentContainer>
        <div>Scroll for more</div>
        <ScrollDownLine className="vert-line"></ScrollDownLine>
      </ScrollContentContainer>
    </BannerContainer>
  );
}
