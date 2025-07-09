import "./Button.css";

const Button = (label, image = null, tipo = null) => `
<button id="${label}" class="${tipo}">${
  image ? `<img src="${image}" alt="${label}" />` : label
}</button>
`;

export default Button;

