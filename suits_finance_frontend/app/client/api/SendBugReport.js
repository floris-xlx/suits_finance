import axios from 'axios';

async function sendBugReport(messageContent) {
    const webhookUrl = 'https://discord.com/api/webhooks/1270675430340427796/9FpyVy2yQxYs8Mj3YtMzEwx6eAHK4SebsjI4jfbgQy36wAaEMYfFOMxJpSD7vL7lkAOg';

    const payload = {
        content: messageContent
    };

    try {
        const response = await axios.post(webhookUrl, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending bug report:', error);
        throw error;
    }
}

export default sendBugReport;