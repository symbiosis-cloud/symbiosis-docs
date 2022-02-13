---
sidebar_position: 2
id: intro
slug: /
---

# Quick Start

This guide will help you set up configure and set-up a Kubernetes cluster in minutes. We will also help you configure kubectl for connecting to the cluster from your command line.

## Creating the cluster

To set-up your own cluster first [sign-in](https://app.symbiosis.host/signin). If you haven't used Symbiosis before you will be prompted to set a team name. This name will be used if you ever plan to invite others to collaborate.

### Configuring the cluster

Next click on **Add new** under the **Clusters** tab in the sidebar.

Make sure your name conforms to [RFC 1123](https://datatracker.ietf.org/doc/html/rfc1123). In short, it should contain only lowercase alphanumeric characters or `-`, and need to start and end with an alphanumerical character. For example: `prod-cluster-region-3`.


When configuring your cluster take notice of the **NGINX Ingress option**,
enabling this will add nginx-ingress and cert-manager. With these services you
will be able to accept incoming HTTP traffic by setting up Kubernetes
Ingresses. More information in [Accepting HTTP traffic](/accepting-http-traffic).

### Cluster Checkout

:::info

Nodes are charged end of month by the amount of hours they've been operational. Nodes that are removed will be prorated, just like for AWS's EC2 or GCP Compute Engine.

:::

You will be prompted to add a payment method for your team at this step, if one hasn't been added for your team yet.

Review your cluster before proceeding. You will be able to add and remove nodes after initialization.

## Configuring kubectl

:::info
If you don't have kubectl installed, read the more detailed instructions at [Setting up kubectl](/kubectl).
:::


In the Symbiosis UI navigate to the **User Account** tab and create a user account for yourself. User accounts are required to interface with the cluster.

Click the **Download** button on your new account, this will download the kubeconfig file with all details needed to connect to your cluster.

By default, kubectl looks for a config in `~/.kube/config`. Lets create the `.kube` directory and move the config there. Substitute `<CONFIG>` with the path to where you downloaded the file.

```bash
$ mkdir -p ~/.kube && mv <CONFIG> ~/.kube/
```

You can check that it works by listing all nodes:

```bash
$ kubectl get nodes
NAME                         STATUS   ROLES                  AGE   VERSION
control-plane-int-1-ssjhly   Ready    control-plane,master   23h   v1.21.4
general-int-1-feqtck         Ready    <none>                 23h   v1.21.4
general-int-1-lbgyqx         Ready    <none>                 23h   v1.21.4
```

Voila! You're ready to start using your cluster.

## Next steps

If you prefer using a GUI to manage Kubernetes have a look at [Lens](https://k8slens.dev).

For details on how to deploy your first docker image and start accepting HTTP traffic, see [Deploying a container](/deploying-a-container).
