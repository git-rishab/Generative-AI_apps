import { Group, Button, Text, TextInput, LoadingOverlay } from '@mantine/core';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { useState } from 'react'
import styles from "./App.module.css";
import { notification, url } from "./notification"

export default function Order({ close }) {
    const [count, handlers] = useCounter(0, { min: 0, max: 10 });
    const [inputValue, setInputValue] = useState('');
    const [visible, { toggle }] = useDisclosure(false);

    const handleOrder = async() => {
        if(!count || !inputValue){
            return notification("",`Please fill all the fields!`, "white","#EF5350")
        }
        toggle()
        const dish = JSON.parse(sessionStorage.getItem('dish'));
        const req = await fetch(`${url}/order`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({dish:dish._id, name:inputValue, quantity:count, dishName:dish.name, price:dish.price})
        })
        const res = await req.json()
        if(res.ok){
            notification("",res.message, "white","#66BB6A")
        } else {
            notification("",res.message, "white","#EF5350")
        }
        close()
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />
            <Text>Quantity: {count}</Text>
            <Group mt="md" position="center">
                <Button onClick={handlers.increment}>Increment</Button>
                <Button onClick={handlers.decrement}>Decrement</Button>
                <Button onClick={handlers.reset}>Reset</Button>
            </Group>

            <TextInput label="Name" placeholder="Username" required
                onChange={handleInputChange}
            />
            <div className={styles.button}><Button variant="light" color="blue" mt="md" radius="md" onClick={handleOrder}>
                Place Order
            </Button></div>
        </>
    );
}