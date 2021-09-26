package kernel

import "fmt"

type EventInterface interface{}

type Unsubscribe func()

var events map[string][]*listener = map[string][]*listener{}

//AddEventListener make listener listens to an event
//It will return an unsubscribe function that you can use to make listeners stop listening to an event
func Subscribe(event string, handler ListenerHandler) Unsubscribe {
	if _, present := events[event]; !present {
		events[event] = make([]*listener, 0)
	}

	listener := newListener(handler)
	events[event] = append(events[event], listener)

	return unsubscribe(event, len(events[event])-1)
}

//TriggerEvent
func TriggerEvent(event string, message EventInterface) error {
	listeners, present := events[event]
	if !present {
		return fmt.Errorf("event %s was not found", event)
	}

	for _, listener := range listeners {
		listener.notificationChannel <- message
	}

	return nil
}

//RemoveEventListener
func unsubscribe(event string, index int) Unsubscribe {
	return func() {
		if _, present := events[event]; !present {
			return
		}

		listener := events[event][index]
		go listener.stop()
		events[event] = append(events[event][:index], events[event][index+1:]...)
	}
}
