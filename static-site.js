#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSite = void 0;
const s3 = require("@aws-cdk/aws-s3");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const iam = require("@aws-cdk/aws-iam");
const core_1 = require("@aws-cdk/core");
class StaticSite extends core_1.Construct {
    constructor(parent, name) {
        super(parent, name);
        const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "JSCC-OAI");
        const siteBucket = new s3.Bucket(this, "JSCCStaticBucket", {
            bucketName: "hat-shop-auto",
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });
        siteBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ["S3:GetObject"],
            resources: [siteBucket.arnForObjects("*")],
            principals: [
                new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
        }));
        const distribution = new cloudfront.CloudFrontWebDistribution(this, "JSCC-distribution", {
            originConfigs: [{
                    s3OriginSource: {
                        s3BucketSource: siteBucket,
                        originAccessIdentity: cloudfrontOAI
                    },
                    behaviors: [{
                            isDefaultBehavior: true
                        }]
                }]
        });
        new s3deploy.BucketDeployment(this, "JSCC-Bucket-Deployment", {
            sources: [s3deploy.Source.asset("./website")],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ["/*"]
        });
    }
}
exports.StaticSite = StaticSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0Esc0NBQXNDO0FBQ3RDLHVEQUF1RDtBQUN2RCxzREFBc0Q7QUFDdEQsd0NBQXdDO0FBQ3hDLHdDQUFpRDtBQUVqRCxNQUFhLFVBQVcsU0FBUSxnQkFBUztJQUN2QyxZQUFZLE1BQWEsRUFBRSxJQUFZO1FBQ3JDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDekQsVUFBVSxFQUFFLGVBQWU7WUFDM0Isb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO1NBQ2xELENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxtQkFBbUIsQ0FDNUIsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN6QixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLFVBQVUsRUFBRTtnQkFDVixJQUFJLEdBQUcsQ0FBQyxzQkFBc0IsQ0FDNUIsYUFBYSxDQUFDLCtDQUErQyxDQUM5RDthQUNGO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDdkYsYUFBYSxFQUFFLENBQUM7b0JBQ2QsY0FBYyxFQUFFO3dCQUNkLGNBQWMsRUFBRSxVQUFVO3dCQUMxQixvQkFBb0IsRUFBRSxhQUFhO3FCQUNwQztvQkFDRCxTQUFTLEVBQUUsQ0FBQzs0QkFDVixpQkFBaUIsRUFBRSxJQUFJO3lCQUN4QixDQUFDO2lCQUNILENBQUM7U0FDSCxDQUFDLENBQUE7UUFFRixJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDNUQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsaUJBQWlCLEVBQUUsVUFBVTtZQUM3QixZQUFZO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBNUNELGdDQTRDQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcclxuLy9AdHMtbm9jaGVja1xyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgczMgZnJvbSBcIkBhd3MtY2RrL2F3cy1zM1wiO1xyXG5pbXBvcnQgKiBhcyBzM2RlcGxveSBmcm9tIFwiQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnRcIjtcclxuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnRcIjtcclxuaW1wb3J0ICogYXMgaWFtIGZyb20gXCJAYXdzLWNkay9hd3MtaWFtXCI7XHJcbmltcG9ydCB7IENvbnN0cnVjdCwgU3RhY2sgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRpY1NpdGUgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogU3RhY2ssIG5hbWU6IHN0cmluZykge1xyXG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcclxuXHJcbiAgICBjb25zdCBjbG91ZGZyb250T0FJID0gbmV3IGNsb3VkZnJvbnQuT3JpZ2luQWNjZXNzSWRlbnRpdHkodGhpcywgXCJKU0NDLU9BSVwiKTtcclxuXHJcbiAgICBjb25zdCBzaXRlQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcIkpTQ0NTdGF0aWNCdWNrZXRcIiwge1xyXG4gICAgICBidWNrZXROYW1lOiBcImhhdC1zaG9wLWF1dG9cIixcclxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxyXG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcclxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcclxuICAgIH0pO1xyXG5cclxuICAgIHNpdGVCdWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShcclxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICAgIGFjdGlvbnM6IFtcIlMzOkdldE9iamVjdFwiXSxcclxuICAgICAgICByZXNvdXJjZXM6IFtzaXRlQnVja2V0LmFybkZvck9iamVjdHMoXCIqXCIpXSxcclxuICAgICAgICBwcmluY2lwYWxzOiBbXHJcbiAgICAgICAgICBuZXcgaWFtLkNhbm9uaWNhbFVzZXJQcmluY2lwYWwoXHJcbiAgICAgICAgICAgIGNsb3VkZnJvbnRPQUkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWRcclxuICAgICAgICAgICksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCBcIkpTQ0MtZGlzdHJpYnV0aW9uXCIsIHtcclxuICAgICAgb3JpZ2luQ29uZmlnczogW3tcclxuICAgICAgICBzM09yaWdpblNvdXJjZToge1xyXG4gICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHNpdGVCdWNrZXQsXHJcbiAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRmcm9udE9BSVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmVoYXZpb3JzOiBbe1xyXG4gICAgICAgICAgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWVcclxuICAgICAgICB9XVxyXG4gICAgICB9XVxyXG4gICAgfSlcclxuXHJcbiAgICBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkpTQ0MtQnVja2V0LURlcGxveW1lbnRcIiwge1xyXG4gICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KFwiLi93ZWJzaXRlXCIpXSxcclxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHNpdGVCdWNrZXQsXHJcbiAgICAgIGRpc3RyaWJ1dGlvbiwgXHJcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiXVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19