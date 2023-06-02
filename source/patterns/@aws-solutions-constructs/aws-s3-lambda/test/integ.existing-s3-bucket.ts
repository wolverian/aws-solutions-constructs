/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

/// !cdk-integ *
import { App, Stack } from "aws-cdk-lib";
import { S3ToLambda, S3ToLambdaProps } from "../lib";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { CreateScrapBucket, suppressAutoDeleteHandlerWarnings } from "@aws-solutions-constructs/core";
import { generateIntegStackName } from '@aws-solutions-constructs/core';

const app = new App();

// Empty arguments
const stack = new Stack(app, generateIntegStackName(__filename));
stack.node.setContext("@aws-cdk/aws-s3:serverAccessLogsUseBucketPolicy", true);

const myBucket = CreateScrapBucket(stack, {});

const props: S3ToLambdaProps = {
  lambdaFunctionProps: {
    code: lambda.Code.fromAsset(`${__dirname}/lambda`),
    runtime: lambda.Runtime.NODEJS_16_X,
    handler: 'index.handler'
  },
  existingBucketObj: myBucket
};

new S3ToLambda(stack, 'test-s3-lambda', props);

suppressAutoDeleteHandlerWarnings(stack);
app.synth();