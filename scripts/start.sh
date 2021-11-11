#!/bin/bash
cd /home/ubuntu/DoRun/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export SERVER_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_PORT --query Parameters[0].Value | sed 's/"//g')



