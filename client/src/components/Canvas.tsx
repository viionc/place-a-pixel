import React, {useEffect, useRef} from "react";
import {Pixel, Position} from "../../../shared/Types";
import {useWebsocket} from "../context/WebsocketContext";

function Canvas() {
    const canvasRef = useRef(null);

    const {sendDrawMessage, drawnPixels} = useWebsocket();

    const drawFromServer = (ctx: CanvasRenderingContext2D, position: Position, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, 4, 4);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        const context = (canvas as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);
        drawnPixels.forEach((pixel: Pixel) => {
            drawFromServer(context, pixel.position, pixel.color);
        });
    }, [drawnPixels]);

    const handleDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        let x = e.clientX - (canvas as HTMLCanvasElement).getBoundingClientRect().left;
        let y = e.clientY - (canvas as HTMLCanvasElement).getBoundingClientRect().top;
        sendDrawMessage({x, y});
    };

    return <canvas ref={canvasRef} id="canvas" className="border" width={1000} height={600} onClick={e => handleDraw(e)}></canvas>;
}

export default Canvas;
