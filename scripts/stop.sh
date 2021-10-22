#!/bin/bash
cd /home/ubuntu/DoRun/server
pm2 stop dist/app.js 2> /dev/null || true
pm2 delete dist/app.js 2> /dev/null || true