import { useState, useEffect } from 'react'
import styles from "./App.module.css";
import { Card, Text, Button, Group, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import Dish from "./Dish"
import { notification, url } from './notification';
import Order from './Order';
import logo from "./assets/logo-2.png"

function App() {
  const [data, setData] = useState([])
  const [orders, setOrders] = useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [addDish, { open:openDish, close:closeDish }] = useDisclosure(false);
  const [request, { toggle }] = useDisclosure(false);

  const handleStatusChange = async(status, id) => {
    const req = await fetch(`${url}/order/status?id=${id}&status=${status}`,{
      method:"PATCH"
    })
    const res = await req.json()
    toggle()
  };

  const handleRemove = async (id)=>{
    const req = await fetch(`${url}/remove/dish/${id}`,{
      method:"DELETE"
    })
    const res = await req.json(); 
    if(res.ok){
      notification("",res.message, "white","#66BB6A")
      toggle()
    } else {
      notification("",res.message, "white","#EF5350")
    }
  }

  useEffect(() => {
    async function get() {
      const req = await fetch(`${url}/menu`)
      const res = await req.json()
      setData(res.data)
      const req2 = await fetch(`${url}/orders`)
      const res2 = await req2.json()
      setOrders(res2.data)
    }
    get()
  }, [url, opened, request, addDish])


  return (
    <>
      <header>
        <div className={styles.logo}><img src={logo} alt="" /></div><span> Tasty-Bites</span>
      </header>
      <Notifications position='bottom-center' />
      <h2>Menu Items</h2>
      <div className={styles.main}>
        {data.length ?
          data?.map((el, i) => {
            return (
              <Card className={styles.child} shadow="sm" padding="lg" radius="md" key={i} withBorder>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{el.name}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  Price: ₹{el.price}
                </Text>

                <Text size="sm" color="dimmed">
                  Quantity: {el.quantity}
                </Text>

                <Button variant="light" color="blue" fullWidth mt="md" onClick={() => { open(); sessionStorage.setItem('dish', JSON.stringify(el)) }} radius="md">
                  Order
                </Button>
                <Button className={styles.remove} variant="light" color="blue" fullWidth mt="md" radius="md" onClick={()=>handleRemove(el.dish)}>
                  Remove
                </Button>
              </Card>

            )
          }) : <p className={styles.empty}>Menu is Empty! Sorry for inconvenience</p>
        }
      </div>
      {/* Order Model */}
      <Modal opened={opened} onClose={close} title="Fill Order Details">
        <Order close={close} />
      </Modal>

      {/* Add Dish */}
      <Modal opened={addDish} onClose={closeDish} title="Fill Order Details">
        <Dish close={closeDish} />
      </Modal>

      <div className={styles.button}>
        <Button variant="light" color="blue" mt="md" radius="md" onClick={openDish}>
          Add Dish
        </Button>
      </div>

      <h2>Orders</h2>
      <div className={styles.main}>
        {orders.length ?
          orders?.map((el, i) => {
            return (
              <Card className={styles.child} shadow="sm" padding="lg" radius="md" key={i} withBorder>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{el.name}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  Dish Name: {el.dishName}
                </Text>

                <Text size="sm" color="dimmed">
                  Price: ₹{el.price}
                </Text>

                <Text size="sm" color="dimmed">
                  Quantity: {el.quantity}
                </Text>
                <Text size="sm" color="dimmed">
                  Status: {el.status}
                </Text>
                <Select
                  label="Update status"
                  placeholder="Select Status"
                  data={[
                    { value: 'preparing', label: 'Preparing' },
                    { value: 'ready for pickup', label: 'Ready for pickup' },
                    { value: 'delivered', label: 'Delivered' }
                  ]}
                  onChange={(value) => handleStatusChange(value, el.id)}
                />
              </Card>

            )
          }) : <p className={styles.empty}>No orders!</p>
        }
      </div>
    </>
  )
}

export default App
