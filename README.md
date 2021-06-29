# Simple HTTP Endpoint Example

This example demonstrates how to setup a pair of nodejs lambdas calling each other using HTTP/API-GW.

## Prerequisites
* npm
* serverless framework
* git to clone the repo
```
npm install --save serverless-pseudo-parameters --save-dev
npm install --save serverless-plugin-lambda-insights --save-dev
npm install --save serverless-plugin-include-dependencies --save-dev
```

## Before deploying it
```
cp env.json.template env.json
# Edit `env.json` to update the correct values
```

## Deployment
```
serverless deploy
```

## Invoke the function locally

```bash
serverless invoke local --function producer
```

Which should result in:

```bash
Serverless: Your function ran successfully.

{
    "statusCode": 200,
    "body": "{\"message\":\"Hello, the current time is 12:49:06 GMT+0100 (CET).\"}"
}
```

## Deploy

In order to deploy the endpoint, simply run:

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
...........................
Serverless: Stack update finished…

Service Information
service: serverless-simple-http-endpoint
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://2e16njizla.execute-api.us-east-1.amazonaws.com/dev/produce
  GET - https://2e16njizla.execute-api.us-east-1.amazonaws.com/dev/ping
functions:
  serverless-simple-http-endpoint-dev-currentTime: arn:aws:lambda:us-east-1:488110005556:function:serverless-simple-http-endpoint-dev-currentTime
```

## Usage

You can  send an HTTP request directly to the endpoint using a tool like curl

```bash
curl -v --request POST --header 'Content-Type: application/json' --data-raw '{"name": "John"}' https://2e16njizla.execute-api.us-east-1.amazonaws.com/dev/produce
```
Should result in:
```
{"message":"The response from the provider is {\"message\":\"Hello, the current time is 13:45:23 GMT+0000 (Coordinated Universal Time).\"}."}* Closing connection 0
```
