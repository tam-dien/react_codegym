import asyncio
import websockets
import json
import random

import os
import django

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
                i[0].activate = False
                i[0].save()
                CONNECTIONS_client.remove(i)
                return
        return
    data = json.loads(data)
    cover = Coversation(mess=data['mess'],client=ws_id,sender=data['sender'])
    cover.save()
    mess_id = cover.id
    await websocket.send(json.dumps({
        "type":"response",
        "id":mess_id,
    }))
    data_send = json.dumps({
            "type":"send",
            "sender":ws_id,
            "mess":data['mess'],
            "id":mess_id
        })
    for ws_ad in CONNECTIONS_admin:
        print("gửi data cho admin",ws_ad[0])
        await ws_ad[1].send(data_send)

async def handleAdmin(websocket,username):
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
    L_conversation[int(ws_id)].append({
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
        if str(ws_ct[0]) == str(ws_id):
            print("gửi data cho client",ws_id)
            await ws_ct[1].send(data_send)
            break

async def server(websocket):
    global sender
    sender += 1
    data = await websocket.recv()
    data = json.loads(data)
    if data["type"] == "client":
        c = Client()
        await sync_to_async(c.save)()
        print(c.id)
        CONNECTIONS_client.append([c,websocket])
        await websocket.send(json.dumps({"id":c.id}))
        for ws_ad in CONNECTIONS_admin:
            print("gửi data cho admin",ws_ad[0])
            await ws_ad[1].send(json.dumps({
                "new_customer":True,
                "id":c.id,
                "time":c.client_id.timestamp()*1000,
            })) 
        while True:
            await handleClient(websocket,c.id)
    if data["type"] == "admin":
        while True:
            try:
                data = await websocket.recv()
            except websockets.exceptions.ConnectionClosed:
                return
            data = json.loads(data)
            user = await sync_to_async(lambda :authenticate(username=data['username'], password=data['password']))()
            if user:
                await websocket.send(json.dumps({
                    "success":True,
                    "token":"bolumbola"
                }))
                break
            else:
                await websocket.send(json.dumps({
                    "success":False,
                }))
        CONNECTIONS_admin.append([data["username"],websocket])
        while True:
            await handleAdmin(websocket,data["username"])

async def main():
    async with websockets.serve(server, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server_casestudy.settings")
    django.setup()
    from django.contrib.auth import authenticate
    from index.models import *
    from asgiref.sync import sync_to_async
    asyncio.run(main())