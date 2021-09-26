package kernel

type ListenerHandler func(event EventInterface)

type listener struct {
	notificationChannel chan EventInterface
	quitChannel         chan bool
	handler             ListenerHandler
}

func newListener(handler ListenerHandler) *listener {
	listener := new(listener)
	listener.notificationChannel = make(chan EventInterface)
	listener.quitChannel = make(chan bool)
	listener.handler = handler

	go listener.start()

	return listener
}

//start the listener by making it listen to the notification channel and the quit chanel
func (instance *listener) start() {
	defer close(instance.notificationChannel)
	defer close(instance.quitChannel)

	for {
		select {
		case event := <-instance.notificationChannel:
			instance.handler(event)
		case <-instance.quitChannel:
			return
		}
	}
}

//stop the listener by sending a signal through the quit chanel
func (instance *listener) stop() {
	instance.quitChannel <- true
}
