const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

const app = express();
expressWs(app);

// 접속자 정보를 저장하기 위한 자료구조
const wsClient = new Map();

// 웹소켓 핸들링 코드
router.ws('/chat', (ws ,req) => {
    // 소켓 연결 요청온 것에 대하여 처리함
    const clientIp = req.socket.remoteAddress;
    console.log('클라이언트 접속함', clientIp);
        
    ws.on('message', (message) => {
        console.log(message.toString()); // 연결된 이후 내부 메세지 처리하는 부분 

        let parsedMessage = "";
        let messageType;
        let username;

        try {
            // 받은 문자열 파싱하여 객체 형태로 만듬
            parsedMessage = JSON.parse(message);
            messageType = parsedMessage.type;
            username = parsedMessage.username;

            console.log(parsedMessage);
            console.log(clientIp, parsedMessage.content);
            // console.log(parseMessage.content); // 글자만 빼내여 출력도 가능
        } catch (error) {
            console.error('JSON 포멧 없음', error);
            return;
        };

        // 세션 ID (유저이름)을 한번도 저장한 적이 없을 때 저장
        if (username && !wsClient.has(username)) {
            wsClient.set(username, ws);
        };

        if (messageType !== 'session') {
            wsClient.forEach((client) => {
                console.log('username:', username);

                // 모든 클라이언트에게 메세지 재전송
                if (client.readyState === WebSocket.OPEN) {
                    const messageType = client === ws ? 'sent' : 'received';
                    const messageObj = { type: messageType, sender: username, content: parsedMessage.content};
                
                    client.send(JSON.stringify(messageObj));
                };
            });
        };
    });
        
    ws.on('close', () => {
        // 연결된 이후 연결 종료를 처리하는 부분
    });
})

module.exports = router;