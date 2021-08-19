import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: black;
}

// some of the tag styling from normalize.css
html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%; 
}

body {
    margin:0;
    font-family: "Open Sans", sans-serif;

    @media(min-width: 640px) {
        padding: 10px;
    }
}

img {
  border-style: none;
}

button,
input,
optgroup,
select {
  font-family: inherit;
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
`;
