import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const table = new aws.dynamodb.Table("circuitbreaker-table", {
  hashKey: "id",
  billingMode: "PAY_PER_REQUEST",
  attributes: [
    {
      name: "id",
      type: "S",
    },
  ],
  streamEnabled: true,
  streamViewType: "NEW_AND_OLD_IMAGES",
});

const apigateway = new awsx.apigateway.API(
  "apigateway",
  {
      routes: [{
          path: "/",
          method: "GET",
          eventHandler: new aws.lambda.CallbackFunction("function", {
              memorySize: 256,
              environment: {
                  variables: {
                      TABLE_NAME: table.name,
                      TABLE_ARN: table.arn
                  }
              },
              callback: async (event) => {
                // This code runs in an AWS Lambda anytime `/` is hit.
                console.log(`Event: ${JSON.stringify(event)}`);
                return {
                    statusCode: 200,
                    body: "Hello, world!",
                };
            },
          })
      }]
  }
);

export const url = apigateway.url;
