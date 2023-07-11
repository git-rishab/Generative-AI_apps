import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import io from 'socket.io-client';
import { url } from '../notification';

const socket = io(url);

function Chat() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        socket.on('GPT', (response) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { content: response, sender: 'bot' },
            ]);
        });

        return () => {
            socket.off('GPT');
        };
    }, []);

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { content: messageInput, sender: 'user' },
        ]);

        socket.emit('user', messageInput);

        // Clear the message input
        setMessageInput('');
    };

    return (
        <>
            <Group style={{position:'fixed', bottom:'30px', right:'50px'}}>
                <Button onClick={toggle}>Help Needed?</Button>
            </Group>

            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                margin: '10px',
                            }}
                        >
                            <div
                                style={{
                                    background: message.sender === 'user' ? '#e1f7d2' : '#f0f0f0',
                                    padding: '8px',
                                    borderRadius: '8px',
                                }}
                            >
                                <Text size="sm">{message.content}</Text>
                            </div>
                        </div>
                    ))}
                </div>

                <Group align="flex-end" style={{ marginTop: '10px' }}>
                    <TextInput
                        value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)}
                        placeholder="Type your message"
                        sx={{ flex: 1 }}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                </Group>
            </Dialog>
        </>
    );
}

export default Chat;
