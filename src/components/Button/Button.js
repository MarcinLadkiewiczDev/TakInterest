import "./Button.css";

const Button = (label, image = null) => `
<button id="${label}">${
  image ? `<img src="${image}" alt="${label}" />` : label
}</button>
`;

export default Button;

