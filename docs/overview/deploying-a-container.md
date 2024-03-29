---
description: Deploying an OCI container into a Symbiosis cluster
---
# Deploy a container

Kubernetes objects are configured through YAML manifests, more info
[here](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/).

This section assumes a container image named `docker-registry/my-backend-api` exposing an API on port 80, substitute it with the name of your own image. For an intro to containers Docker offers a introduction [here](https://www.docker.com/resources/what-container).

## Create a deployment manifest
:::info

For more information on Kubernetes Deployments read the [official documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

:::

We will create a simple deployment with three replicas. By default Kubernetes uses a rolling update strategy. This means that, for example, if we update the image tag it will rollout the new images one by one to avoid any potential downtime.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-backend-api
  labels:
    app: my-backend-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-backend-api
  template:
    metadata:
      labels:
        app: my-backend-api
    spec:
      containers:
        - name: my-backend-api
          image: docker-registry/my-backend-api
          ports:
            - containerPort: 80
```

Deploy the yaml to your cluster:
```shell
kubectl create -f deploy.yaml
```

Voila! Your container should now be running, check its status by writing `kubectl describe pod my-backend-api`.

However, your container will not be accessible from the internet. If you want to enable an ingress have a look at installing an ingress controller such as [NGINX Ingress](https://kubernetes.github.io/ingress-nginx/deploy/).
