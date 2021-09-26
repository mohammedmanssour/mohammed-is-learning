package main

import (
	"fmt"
	kernel "mohammedmanssour-events/kernal"
	"time"
)

type User struct {
	name  string
	email string
}

func main() {
	unsubscribe1 := kernel.Subscribe("UserRegistered", func(event kernel.EventInterface) {
		User := event.(User)

		fmt.Printf("User Registered with name %s and email %s\n", User.name, User.email)
	})

	unsubscribe2 := kernel.Subscribe("UserRegistered", func(event kernel.EventInterface) {
		User := event.(User)

		fmt.Printf("Simulate sending email to %s:%s\n", User.name, User.email)
	})

	defer unsubscribe1()
	defer unsubscribe2()

	err := kernel.TriggerEvent(
		"UserRegistered",
		User{
			name:  "Mohammed Manssour",
			email: "manssour.mohammed@gmail.com",
		},
	)

	if err != nil {
		fmt.Printf("Can not trigger %s event", "UserRegistered")
		return
	}

	time.Sleep(time.Second * 3)
}
