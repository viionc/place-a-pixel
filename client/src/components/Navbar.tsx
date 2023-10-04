import {useWebsocket} from "../context/WebsocketContext";

function Navbar() {
    const {connectedPlayers} = useWebsocket();
    return <div className="w-full bg-zinc-700 h-[30px] text-white">Players Online: {connectedPlayers}</div>;
}

export default Navbar;
