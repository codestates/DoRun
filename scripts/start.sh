#!/bin/bash
cd /home/ubuntu/DoRun/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URL=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URL --query Parameters[0].Value | sed 's/"//g')
export SERVER_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_PORT --query Parameters[0].Value | sed 's/"//g')

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export S3_ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')
export S3_SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_SECRET_KEY --query Parameters[0].Value | sed 's/"//g')
export S3_REGION=$(aws ssm get-parameters --region ap-northeast-2 --names S3_REGION --query Parameters[0].Value | sed 's/"//g')
export REDIS_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names REDIS_HOST --query Parameters[0].Value | sed 's/"//g')
export REDIS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names REDIS_PORT --query Parameters[0].Value | sed 's/"//g')
export REDIS_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names REDIS_PASSWORD --query Parameters[0].Value | sed 's/"//g')




authbind --deep pm2 start processes.config.ts
