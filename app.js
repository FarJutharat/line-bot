// Channel access token
const accessToken = "+fynFUAPSgbSW6D4TQ39fUOcj0ZwZw8wmmDB2CkPndJQLsGbcXJTRb1Oh6R7mPcqJwvt5xEHXBvcEpgLHOzusudqI+rsRef4Nrh3hZeBLEVjglDWmtFSivF0KJMp0ObO7sWDD2T2D5ZmlhC3HUWjkQdB04t89/1O/w1cDnyilFU="
const secretToken =  "5d1964d0f9acd3b8f6dfa513690ae6a0"


// Import Library
const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: accessToken, // Key to call messaging api เรียก
    channelSecret: secretToken       // Key to access line channel
};

const client = new line.Client(config);

// รับพารามิเตอร์ 3 ตัว /webhook ที่อยู่ส่วนสุดท้ายของ url
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get('/ping', function (req,res){
    console.log('ping-pong');
    res.send('ping-pong');
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    if(eventText == 'น้องผ่อง') {
        var msg = {
            type: 'text',
            text: 'สวัสดีครัช'
        };
    }

    var eventText = event.message.text.toLowerCase();

    if(eventText === 'hi'){
        var msg = {
            type: 'text',
            text: 'ดีจ้า'
        };
    }
    else if(eventText === 'day'){
        var msg = {
            type: 'text',
            text: 'Daysอะไรก็ไม่รู้'
        };
    }


    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
