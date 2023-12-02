import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
@font-face {
  font-family: "Gill Sans MT";
  src: url("./fonts/gill-sans-mt-regular.TTF");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Gill Sans MT";
  src: url("./fonts/gill-sans-mt-regular-italic.TTF");
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: "Gill Sans MT";
  src: url("./fonts/gill-sans-mt-bold.TTF");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Gill Sans MT";
  src: url("./fonts/gill-sans-mt-bold-italic.TTF");
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: "Baskerville Old Face";
  src: url("./fonts/BASKVILL.ttf");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Yu Gothic UI";
  src: url("./fonts/Yu Gothic UI - Regular.ttf");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Yu Gothic UI";
  src: url("./fonts/Yu Gothic UI - Light.ttf");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Yu Gothic UI";
  src: url("./fonts/Yu Gothic UI - Semilight.ttf");
  font-weight: 350;
  font-style: normal;
}

@font-face {
  font-family: "Yu Gothic UI";
  src: url("./fonts/Yu Gothic UI - Semibold.ttf");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Yu Gothic UI";
  src: url("./fonts/Yu Gothic UI - Bold.ttf");
  font-weight: 700;
  font-style: normal;
}
`}
  />
);

export default Fonts;
