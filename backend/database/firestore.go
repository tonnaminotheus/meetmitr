package database

import (
	"backend/utils"
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var (
	Firestore *firestore.Client
	Bucket    *storage.BucketHandle
)

func InitFirestore() {
	ctx := context.Background()
	sa := option.WithCredentialsFile("./secret/FirebaseServiceAccount.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}
	Firestore, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	client, err := app.Storage(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	Bucket, err = client.Bucket(utils.BucketName)
	if err != nil {
		log.Fatalln(err)
	}

}
