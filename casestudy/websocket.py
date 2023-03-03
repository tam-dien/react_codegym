import asyncio
import websockets
import json
import random

sender = 0

CONNECTIONS_client = []
CONNECTIONS_admin = []

L_conversation = {}

async def handleClient(websocket,ws_id):
    try:
        data = await websocket.recv()
    except websockets.exceptions.ConnectionClosed:
        for i in CONNECTIONS_client:
            if i[1] == websocket:
                CONNECTIONS_client.remove(i)
                return
        return
    data = json.loads(data)
    mess = data['mess']
    mess_id = random.randint(1,10000)
    L_conversation[ws_id].append({
        "sender":0,
        "mess":mess,
        "id":mess_id,
    })
    data_send = json.dumps({
            "sender":ws_id,
            "mess":data['mess'],
            "id":mess_id
        })
    for ws_ad in CONNECTIONS_admin:
        ws_ad.send(data_send)

async def handleAdmin(websocket):
    try:
        data = await websocket.recv()
    except websockets.exceptions.ConnectionClosed:
        for i in CONNECTIONS_admin:
            if i[1] == websocket:
                CONNECTIONS_admin.remove(i)
                return
        return
    data = json.loads(data)
    mess = data['mess']
    mess_id = random.randint(1,10000)
    ws_id = data['id']
    L_conversation[ws_id].append({
        "sender":data['sender'],
        "mess":mess,
        "id":mess_id,
    })
    data_send = json.dumps({
            "sender":data['sender'],
            "mess":data['mess'],
            "id":mess_id
        })
    for ws_ct in CONNECTIONS_client:
        if ws_ct[0] == ws_id:
            await ws_ct[1].send(data_send)
            break

async def server(websocket):
    global sender
    sender += 1
    data = await websocket.recv()
    data = json.loads(data)
    if data["type"] == "client":
        CONNECTIONS_client.append([data["id"],websocket])
        L_conversation[data["id"]] = []
        for ws_ad in CONNECTIONS_admin:
            ws_ad.send(json.dumps({
                "new_customer":True,
                "id":data['id'],
            })) 
        while True:
            await handleClient(websocket,data["id"])
    if data["type"] == "admin":
        CONNECTIONS_admin.append([data["id"],websocket])
        while True:
            await handleAdmin(websocket,data["id"])

async def main():
    async with websockets.serve(server, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())