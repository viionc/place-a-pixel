import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import {WebSocketContextProps, Pixel, Position} from "../../../shared/Types";
import {socket} from "../socket";

const WebSocketContext = createContext<null | WebSocketContextProps>(null);

export const useWebsocket = () => {
    let context = useContext(WebSocketContext);
    if (!context) throw Error("something went wrong");
    return context;
};

function WebSocketContextProvider({children}: {children: ReactNode}) {
    const [connectedPlayers, setConnectedPlayers] = useState<number>(0);
    const [drawnPixels, setDrawnPixels] = useState<Pixel[]>([]);
    const [selectedColor, setSelectedColor] = useState<string>("#ffffff");

    const sendDrawMessage = (position: Position) => {
        socket.emit("draw", {position, color: selectedColor});
    };

    const onColorChange = (color: string) => {
        setSelectedColor(color);
    };

    useEffect(() => {
        function onConnect() {
            console.log("connected");
        }

        function onDisconnect() {
            console.log("disconnected");
        }
        function onOnline(data: number) {
            console.log(data);
            setConnectedPlayers(data);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("online", (data: number) => onOnline(data));
        socket.on("pixels", (pixels: Pixel[]) => setDrawnPixels(prev => (prev = [...pixels])));

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{connectedPlayers, sendDrawMessage, drawnPixels, onColorChange, selectedColor}}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketContextProvider;
