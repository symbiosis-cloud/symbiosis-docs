---
sidebar_position: 5
title: Accepting HTTP traffic
description: Accepting HTTP Traffic with NGINX Ingress and cert-manager
slug: /accepting-http-traffic
---

# Accepting HTTP traffic with NGINX Ingress

:::caution

This step requires that you selected the **NGINX Ingress configuration** option when you created your cluster.
If not, NGINX ingress and cert-manager can be installed manually after cluster initialization.

:::

Ingresses are used to control access to a service in a cluster, typically over HTTP. Symbiosis supports ingresses using the [NGINX Ingress controller](https://kubernetes.github.io/ingress-nginx/).

## Creating a service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-test-service
spec:
  selector:
    app: my-test-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376

```

## Creating an ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-test-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - http:
      paths:
      - path: /path
        pathType: Prefix
        backend:
          service:
            name: my-test-service
            port:
              number: 80
```
