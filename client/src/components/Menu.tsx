import {useWebsocket} from "../context/WebsocketContext";

function Menu() {
    const {onColorChange, selectedColor} = useWebsocket();

    return (
        <div className="flex justify-center space-x-2 text-white w-[20rem] h-[2.5rem]">
            <label htmlFor="nativeColorPicker1">Color: </label>
            <input id="nativeColorPicker1" type="color" value={selectedColor} onChange={e => onColorChange(e.target.value)} />
        </div>
    );
}

export default Menu;
