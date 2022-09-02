---
sidebar_position: 4
---

# Horizontal Pod Autoscaling

This guide will help you set up a Horizontal Pod Autoscaler in your cluster.

You can find more information about what Horizontal Pod Autoscaler is and how it works [here](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

## Installing the Kubernetes Metrics Server

In order to use a Horizontal Pod Autoscaler you will need to enable the Kubernetes Metrics Server. This can be easily done via Kubectl or Helm.
A Horizontal Pod Autoscaler uses the Metrics Server in order to determine the current usage of pods so it can make accurate scaling decisions.

### Option 1) Installation via kubectl (easiest)


Run the following kubectl command in your cluster in order to install the Metrics Server.

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### Option 2) Installation via Helm

Run the following Helm commands to install the Metrics Server onto your Kubernetes cluster:

```
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm repo update metrics-server
helm upgrade --install metrics-server metrics-server/metrics-server
```

## Creating your Horizontal Pod Autoscaler

In order for us to test if the Horizontal Pod Autoscaler will work we will need to create a sample deployment:

```
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
spec:
  selector:
    matchLabels:
      run: php-apache
  replicas: 1
  template:
    metadata:
      labels:
        run: php-apache
    spec:
      containers:
      - name: php-apache
        image: registry.k8s.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
          requests:
            cpu: 200m
EOF
```

Now you can create a simple autoscaler as such:

```
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
```

If the targets show up correctly as x%/50% then it means that the Horizontal Pod Autoscaler works as intended and the .

```
kubectl get hpa -w

NAME         REFERENCE               TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   <unknown>/50%   1         10        0          7s
php-apache   Deployment/php-apache   0%/50%          1         10        1          15s
```


You can check out a more thorough example on the official Kubernetes documentation section about [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/).