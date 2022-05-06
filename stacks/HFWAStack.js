import { resolve } from 'path'
import { StackContext, Api, Bucket } from '@serverless-stack/resources'
import { aws_s3_deployment, RemovalPolicy } from 'aws-cdk-lib'

/**
 * @param {StackContext} ctx
 */
export function HFWAStack({ stack }) {
  let deployedModulesBucket

  if (!process.env.IS_LOCAL) {
    const path = resolve(__dirname, '..', '..', 'backend', 'components')

    const modulesBucket = new Bucket(stack, 'modules', {
      cdk: {
        bucket: {
          websiteIndexDocument: 'index.html',
          websiteErrorDocument: '404.html',
          publicReadAccess: true,
          autoDeleteObjects: true,
          removalPolicy: RemovalPolicy.DESTROY,
        },
      },
    })

    deployedModulesBucket = new aws_s3_deployment.BucketDeployment(stack, 'ModulesDeployment', {
      sources: [aws_s3_deployment.Source.asset(path)],
      destinationBucket: modulesBucket.cdk.bucket,
    })
  }

  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'functions/lambda.handler',
      'GET /_static/{proxy+}': !deployedModulesBucket
        ? 'functions/proxy.handler'
        : {
            type: 'url',
            url: `${deployedModulesBucket.deployedBucket.bucketWebsiteUrl}/{proxy}`,
          },
    },
  })

  stack.addOutputs({
    apiURL: api.url,
  })
}
