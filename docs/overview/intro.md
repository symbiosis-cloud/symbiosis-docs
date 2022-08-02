---
sidebar_position: 2
id: intro
slug: /
---

# Quick Start

This guide will help you set up configure and set-up a Kubernetes cluster in minutes. We will also help you configure kubectl for connecting to the cluster from your command line.

## Creating a Kubernetes cluster

To set-up your own cluster first [sign-in](https://app.symbiosis.host/signin). If you haven't used Symbiosis before you will be prompted to set a team name, your team name can easily be changed later on.

### Configuration

Next click on **Add new** under the **Kubernetes Clusters** tab in the sidebar.

Make sure the name of your cluster conforms to [RFC 1123](https://datatracker.ietf.org/doc/html/rfc1123). In short, it should contain only lowercase alphanumeric characters or `-`, and need to start and end with an alphanumerical character. For example: `prod-cluster-germany-1`.

Nodes are charged end of month by the amount of minutes they've been operational. If you haven't set a payment method you will be prompted to do so after configuring your cluster.

## Configuring kubectl

:::info
If you don't have kubectl installed, read the more detailed instructions at [Setting up kubectl](/overview/kubectl).
:::


In the Symbiosis UI navigate to the **User Account** tab and create a user account for yourself in order for `kubectl` to be able to authenticate against the new cluster.

Click the **Download** button on your new account, this will download the kubeconfig file with all details needed to connect to your cluster.

By default, kubectl looks for a config in `~/.kube/config`. Create the `.kube` directory if it doesn't exist and add the config. The below command will optionally merge with any pre-existing config and select your new cluster as the default context. Substitute `<CONFIG>` with the path to the downloaded config file.

```bash
$ mkdir -p ~/.kube && KUBECONFIG=<CONFIG>:~/.kube/config kubectl config view --flatten > ~/.kube/config
```

You can check that `kubectl` has been set up by listing all nodes:

```bash
$ kubectl get nodes
NAME                         STATUS   ROLES                  AGE   VERSION
general-int-1-feqtck         Ready    <none>                 23h   v1.23.5
general-int-1-lbgyqx         Ready    <none>                 23h   v1.23.5
```

Voila! You're ready to start using your cluster.

## Next steps

If you prefer using a GUI to manage Kubernetes have a look at [Lens](https://k8slens.dev).

For details on how to deploy your first docker image and start accepting HTTP traffic, see [Deploying a container](/overview/deploying-a-container).
