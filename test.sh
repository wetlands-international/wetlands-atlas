#!/bin/bash 

docker buildx build --platform=linux/amd64 \
    --build-arg PAYLOAD_SECRET=86e02b85ae1939ede8cc7fa9 \
    --build-arg DATABASE_URI=postgres://u58i4hg18srmh1:p6541345a8fcb754900742a566a68520af1bf65c093ed2ecc822be53f3c6483f0@c7pvjrnjs0e7al.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/d48nmoeip8ngk7 \
    --build-arg NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoid2V0bGFuZHMtdml6enVhbGl0eSIsImEiOiJjbWFjOGcyZ2swMGY2MmlzZWY5NXY1anJ1In0.NFhE35Pn7te47Q_OluiwUQ \
    --build-arg NEXT_PUBLIC_API_URL=http://localhost \
    -t wetlands . && docker rm -f wetlands-container && docker run -d --name wetlands-container -p 80:80 wetlands