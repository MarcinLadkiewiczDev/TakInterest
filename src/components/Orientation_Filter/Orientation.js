import "./Orientation.css";

const Orientation = () => `
<div id="orientation">
<div class=".landscape">
    <input type="checkbox" value="landscape" id="landscape" name="orientation"/>
    <label>Landscape</label>
</div>
<div class=".portrait">
    <input type="checkbox" value="portrait" id="portrait" name="orientation"/>
    <label>Portrait</label>
</div>
<div class=".squarish">
    <input type="checkbox" value="squarish" id="squarish" name="orientation"/>
    <label>Squarish</label>
</div>
</div>
`;

export default Orientation;