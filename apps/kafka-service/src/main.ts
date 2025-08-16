import {kafka} from "@packages/utils/kafka"
import { updateUserAnalytics } from "./services/analytics.service";



const consumer = kafka.consumer({groupId: "user-events-group"})

const eventQueue: any[] = [];

const processQueue = async() => {
  if(eventQueue.length === 0) return;

  const events = [...eventQueue]
  eventQueue.length = 0

  for (const event of events){
    if(event.action === "shop_visit"){
      // Update shop anyltics
    }

    const validActions = [
      "add_to_wishlist",
      "add_to_cart",
      "product_view",
      "remove_from_wishlist",
    ];

    if(!event.action || !validActions.includes(event.action)){
      continue
    }
    try {
      await updateUserAnalytics(event)
    } catch (error) {
      console.log("error processing event:", error)
    }
  }
};

setInterval(processQueue, 3000);  //  3000 ms = 3s

// Kafka consumer events
export const consumerKafkaMessages = async () => {
  // connect to the kafka broker

  await consumer.connect()
  await consumer.subscribe({topic: "users-events", fromBeginning: false})

  await consumer.run({
    eachMessage: async({message}) => {
      if(!message.value) return
      const event = JSON.parse(message.value.toString());
      eventQueue.push(event)
    }
  })
}

consumerKafkaMessages().catch(console.error)