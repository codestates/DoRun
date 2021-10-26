#!/bin/bash
cd /home/ubuntu/DoRun/server
pm2 stop dist/src/app.js 2> /dev/null || true
pm2 delete dist/src/app.js 2> /dev/null || true
pm2 ls