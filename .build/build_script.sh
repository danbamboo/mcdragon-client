#!/bin/sh

AWS_REGISTRY="678384612607.dkr.ecr.us-west-2.amazonaws.com"
APP_NAME="/philosophia_client"
DOCKER_CONTAINER_NAME=${AWS_REGISTRY}${APP_NAME}
BRANCH="master"
LATEST="latest"

echo "--Build a new host container as ${DOCKER_CONTAINER_NAME}:${BRANCH}"

npm run build
docker build -f .build/Dockerfile -t="${DOCKER_CONTAINER_NAME}:${BRANCH}" -t="${DOCKER_CONTAINER_NAME}:${LATEST}" .
#philosophia
AWS_ACCESS_KEY_ID=${NES_AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${NES_AWS_SECRET_ACCESS_KEY}
docker push ${DOCKER_CONTAINER_NAME}

# SSH and restart container
echo "Running Docker to start JMeter in Master mode"
ssh -i "philosophia.pem" ec2-user@ec2-52-12-173-187.us-west-2.compute.amazonaws.com << EOF
  echo "Logging in"
  eval $(aws ecr get-login --region us-west-2 --no-include-email)
  docker stop philosophia-client
  docker rm philosophia-client
  docker rmi -f 678384612607.dkr.ecr.us-west-2.amazonaws.com/philosophia_client

  docker run \
  --name philosophia-client \
  -p 80:5000 \
  678384612607.dkr.ecr.us-west-2.amazonaws.com/philosophia_client
  
EOF

#reset AWS params
source ~/.bash_profile
