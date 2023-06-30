from queue import Queue

q1 = Queue()
q2 = Queue()


def push(el):
  q1.put(el)

def get() :
  

push(5)
push(8)
print(q1.get())
print(q1.get())