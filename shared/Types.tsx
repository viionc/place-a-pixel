export type Position = {
    x: number;
    y: number;
};
export type WebSocketContextProps = {
    connectedPlayers: number;
    sendDrawMessage: (position: Position) => void;
    drawnPixels: Pixel[];
    onColorChange: (color: string) => void;
    selectedColor: string;
};

export type Pixel = {
    position: Position;
    color: string;
};
