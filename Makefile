# inspired by: https://gist.github.com/DarrenN/8c6a5b969481725a4413
TAG != cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g' | xargs | cut -d ':' -f 2
IMAGE ?= haugom/jamming:$(TAG)

.PHONY: docker-image
docker-image:
	echo $(TAG)
	echo $(IMAGE)
	docker build -t $(IMAGE) -f docker/Dockerfile-prod .

.PHONY: push-image
push-image: docker-image
	docker push $(IMAGE)
