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

// Imports
import { App, Stack } from "aws-cdk-lib";
import { CloudFrontToS3, CloudFrontToS3Props } from "../lib";
import { generateIntegStackName, suppressAutoDeleteHandlerWarnings } from '@aws-solutions-constructs/core';

// Setup
const app = new App();
const stack = new Stack(app, generateIntegStackName(__filename));
stack.node.setContext("@aws-cdk/aws-s3:serverAccessLogsUseBucketPolicy", true);
stack.templateOptions.description = 'Integration Test for aws-cloudfront-s3';

// Definitions
const blockPublicAccess = false;
const testProps: CloudFrontToS3Props = {
  bucketProps: {
    enforceSSL: false,
    publicReadAccess: true,
    blockPublicAccess: {
      blockPublicAcls: blockPublicAccess,
      restrictPublicBuckets: blockPublicAccess,
      blockPublicPolicy: blockPublicAccess,
      ignorePublicAcls: blockPublicAccess
    },
    websiteIndexDocument: "index.html"
  },
  insertHttpSecurityHeaders: false
};

new CloudFrontToS3(stack, 'test-cloudfront-s3-legacy-http-origin', testProps);

suppressAutoDeleteHandlerWarnings(stack);

// Synth
app.synth();
