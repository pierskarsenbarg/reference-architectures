# Circuit breaker pattern using Pulumi

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new)

## Dependencies

* [Pulumi CLI](https://www.pulumi.com/docs/get-started/aws/begin/#install-pulumi)
* [Node.js](https://www.pulumi.com/docs/get-started/aws/begin/#install-language-runtime)

## Deploy

* `npm install`
* `pulumi stack init dev`
* `pulumi config set aws:region us-east-2`
* `pulumi up`

Check that it works

`curl ${pulumi stack output url}`

When you're done

`pulumi destroy`