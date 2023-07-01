snacks = {}

def add() :
    id = input("Enter ID: ")
    name = input("Enter name: ")
    price = input("Enter Price: ")
    availability = input(f"Enter available {name}s: ")
    snacks[id] = {
        "name":name,
        "price":int(price),
        "availability":int(availability),
        "sales":0
    }
    return operation()

def remove() :
    userInput = input("Enter snack ID: ")
    if userInput in snacks :
        print(f"{snacks[userInput]['name']} has been removed!")
        del snacks[userInput]
        return operation()
    else :
        print("Please enter valid snack ID")
        return remove()

def update() :
    print("Enter snack ID to update the availability of a snack")
    userInput = input("Enter snack id :")
    if userInput in snacks :
        availability = input("Enter updated stock: ")
        snacks[userInput]["availability"] = availability
        print(f"{snacks[userInput]['name']}'s inventory has been updated!")
        return operation()
    else :
        print("Please enter valid snack ID")
        return update()

def record():
    print("Enter snack ID to record Sale")
    userInput = input("Enter snack ID :")
    if(userInput not in snacks) :
        print("Please enter valid snack ID")
        return record()
    sale = input("Enter quantity: ")
    if int(snacks[userInput]["availability"]) < int(sale) :
        print(f"Only {snacks[userInput]['availability']} pcs of {snacks[userInput]['name']} is available")
        return record()
    snacks[userInput]["availability"] -= int(sale)
    snacks[userInput]["sales"] += int(sale)
    print("Sale has been recorded")
    return operation()



def operation() :
    print("1. Add Snack")
    print("2. Remove Snack from Inventory")
    print("3. Update Inventory")
    print("4. Sales Record")
    print("5. Exit")
    userInput = input("Choose an option: ")

    if userInput == "1" :
        add()
    elif userInput == "2" :
        remove()
    elif userInput == "3" :
        update()
    elif userInput == "4":
        record()
    elif userInput == "5" :
        return
    else :
        print("Please enter valid input")


operation()
print(snacks)