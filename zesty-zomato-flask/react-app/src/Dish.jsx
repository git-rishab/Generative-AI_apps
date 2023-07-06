import React from 'react'
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, TextInput, NumberInput, Button } from '@mantine/core';
import { notification, url } from './notification';

export default function Dish({ close }) {
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            name: '',
            quantity: 0,
            price: 0
        },

        validate: {
            name: (val) => (val.length >= 1 ? null : 'Please Enter valid name'),
            quantity: (val) => (val <= 0 ? 'Please select Quantity' : null),
            price: (val) => (val <= 0 ? 'Please select price' : null)
        },
    });
    const handleSubmit = async () => {
        toggle()
        const req = await fetch(`${url}/add/dish`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({...form.values})
        })
        const res = await req.json()
        notification("",res.message, "white","#66BB6A")
        close()
    }

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />
            <form onSubmit={form.onSubmit(() => { handleSubmit() })}>
                <TextInput
                    label="Name Of Dish"
                    placeholder="Dish name"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    radius="md"
                    required
                />

                <NumberInput
                    label="Quantity"
                    placeholder="Quantity of Dish"
                    min={0}
                    max={50}
                    {...form.getInputProps('quantity')}
                    required
                />

                <NumberInput
                    label="Price of Dish"
                    placeholder="Price in Rupees"
                    min={0}
                    max={1000}
                    {...form.getInputProps('price')}
                    required
                />
                <Button type='submit' variant="light" color="blue" mt="md" radius="md" >
                    Submit
                </Button>
            </form>
        </>
    )
}
