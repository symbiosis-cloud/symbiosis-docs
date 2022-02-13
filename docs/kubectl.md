---
sidebar_position: 3
---

# Setting up kubectl
:::info

kubectl is a command-line tool used to run commands against Kubernetes clusters. You can use kubectl to deploy applications, inspect and manage cluster resources, and view logs. More information [here](https://kubernetes.io/docs/tasks/tools/).

If you prefer a GUI have a look at [Lens](https://k8slens.dev/).

:::

## Installation

Make sure you have kubectl installed locally.
```bash
$ which kubectl
/usr/local/bin/kubectl
```

- [Install kubectl on Linux](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Install kubectl on macOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [Install kubectl on Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

## Download config

In the Symbiosis UI navigate to the **User Account** tab and create a user account for yourself. User accounts are required to interface with the cluster.

Click the **Download** button on your new account, this will download the config file that you will use to connect to your cluster.

By default, kubectl looks for a config in `~/.kube/config`. Lets create the `.kube` directory and move the config there.

```bash
$ mkdir -p ~/.kube && mv <PATH_TO_DOWNLOADED_CONFIG> ~/.kube/
```

You can check that it works by listing all nodes:

```bash
$ kubectl get nodes
NAME                         STATUS   ROLES                  AGE   VERSION
control-plane-int-1-ssjhly   Ready    control-plane,master   23h   v1.21.4
general-int-1-feqtck         Ready    <none>                 23h   v1.21.4
general-int-1-lbgyqx         Ready    <none>                 23h   v1.21.4
```

**Note:** User accounts are implemented as Kubernetes Service Accounts under the hood. This may be subject to change in the future.
