---
sidebar_position: 6
title: Accepting HTTP traffic
description: Accepting HTTP Traffic with NGINX Ingress and cert-manager
slug: /accepting-http-traffic
---

# Accepting HTTP traffic

:::caution

This step requires that you selected the **NGINX Ingress configuration** option when you created your cluster.
If not, NGINX ingress and cert-manager can be installed manually after cluster initialization.

:::

## Supported Ingress Controller

Ingresses are used to control access to a service in a cluster, typically over HTTP. Symbiosis supports the following Ingress Controller.

| Ingress Controller | Link                                        |
| ------------------ | ------------------------------------------- |
| NGINX Ingress      | https://kubernetes.github.io/ingress-nginx/ |

## Accepting traffic

Symbiosis does not currently support external load balancers. This means that with the creation of an Ingress Controller and a ClusterIP type service, no external IP will be automatically assigned. The `EXTERNAL-IP` field will remain permanently in the `<pending>` state.

```text
NAME                           TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller       LoadBalancer   10.102.8.219   <pending>     80:31779/TCP,443:30460/TCP   3d16h
```

Nevertheless, it is possible to receive external traffic on the Ingress Controller. For this, a DNS record of the corresponding domain must be set to the public address of the API IP. 

### 1. DNS record

To get the public ip of your cluster, execute the following command:
`kubectl cluster-info`

This will print out the following information:
```text
Kubernetes control plane is running at https://123.232.213.251:6443
CoreDNS is running at https://123.232.213.251:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

`123.232.213.251` is the public ip of your cluster. Now you need to set an A record of the domain you would like to reach your service with to `123.232.213.251`.
### 2. Creating a service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-backend-service
spec:
  selector:
    app: my-backend-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376

```

### 3. Creating an ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-backend-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: sub.example.com
    http:
      paths:
      - path: /path
        pathType: Prefix
        backend:
          service:
            name: my-test-service
            port:
              number: 80
```

Now, the example backend we deployed should be reachable under https://sub.example.com .

:::info
If you selected **NGINX Ingress configuration** option in the creation process of the cluster a cert-manager instance
was automatically deployed into the cluster. Cert-manager takes care of handling HTTPS / TLS certificates.
:::