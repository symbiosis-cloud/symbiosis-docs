---
sidebar_position: 3
---
# Ingresses

Kubernetes Ingresses is a resource for routing external requests to services in your cluster. An ingress requires both an Ingress resource for configuration and an Ingress controller that implements the rules and routes traffic to the correct service. Symbiosis supports creating ingresses by selecting the NGINX Ingress configuration at cluster creation.

Configuring NGINX Ingress will also add cert-manager for provisioning TLS certificates from [Lets Encrypt](https://letsencrypt.org/). Before continuing, make sure you have a domain name and DNS A record to point to the load balancer IP. If you haven't purchased a domain name yet we recommend (and are happy users of) [Namecheap](https://www.namecheap.com).

:::info
Configuration of NGINX Ingress will provision a billable loadbalancer for your cluster. Make sure to remove the NGINX Ingress load balancer service if you no longer wish to use these resources.
:::

## Creating a sample ingress

First, lets create a sample deployment with a service routing requests to two pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
        - name: hello-world
          image: nginxdemos/hello
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: hello-world-svc
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: hello-world
```

With this setup the pods are not accessable outside of the cluster. Creating a load balancer service would make them reachable from the internet, however it would not support flexible routing, built-in TLS support or any of the other perks of the ingress resource.

Instead, lets create an Ingress and point it to your domain, substitute `example.com` with your own:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-world-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
    - hosts:
        - example.com
      secretName: hello-world-tls
  rules:
    - host: example.com
      http:
        paths:
          - pathType: Prefix
            path: "/hello"
            backend:
              service:
                name: hello-world-svc
                port:
                  number: 80
```

Creating the ingress will cause cert-manager to request a Let's Encrypt certificate for the chosen host, `example.com`. If the DNS record has been set up correctly then requests to `https://example.com/hello` will be routed to the `hello-world-svc` service. This service will in turn route the requests to any of the two pods in the previous deployment.

Apart from flexible layer 7 routing and support for SSL certificates NGINX Ingress supports external authentication,  URI rewrites, setting custom headers and more. Have a look at their [official documentation](https://kubernetes.github.io/ingress-nginx/).
