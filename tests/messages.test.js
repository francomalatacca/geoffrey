const messages = require('../helper/messages');

test('extract text messages from whatsapp messages structure', () => {
    const sample_message = {
        "object": "whatsapp_business_account",
        "entry": [{
            "id": "102143949224831",
            "changes": [{
                "value": {
                    "messaging_product": "whatsapp",
                    "metadata": {
                        "display_phone_number": "15550655921",
                        "phone_number_id": "102405779198308"
                    },
                    "contacts": [{
                        "profile": {
                            "name": "Franco Malatacca"
                        },
                        "wa_id": "393293764350"
                    }],
                    "messages": [{
                        "from": "393293764350",
                        "id": "wamid.HBgMMzkzMjkzNzY0MzUwFQIAEhgUM0VCMDZCQjBEMjIwNENDNjcyNjgA",
                        "timestamp": "1657091063",
                        "text": {
                            "body": "test"
                        },
                        "type": "text"
                    }]
                },
                "field": "messages"
            }]
        }]
    }

    expect(messages(sample_message)).toBe('test')
});