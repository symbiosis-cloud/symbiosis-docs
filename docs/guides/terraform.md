---
sidebar_position: 4
---
# Terraform setup

Terraform is a declarative tool for building and maintaining infrastructure, such as cloud resources. Terraform can be used to provision Symbiosis clusters and node pools, but it can also manage team membership and permissions.

This guide will show how to setup a cluster using terraform.

:::info
For a complete reference of the Symbiosis terraform provider see the [official documentation](https://registry.terraform.io/providers/symbiosis-cloud/symbiosis/latest/docs).
:::


## Installing terraform

Terraform is a command line tool. Links to download Terraform can be found [here](https://www.terraform.io/downloads).

Ensure that terraform is installed:
```bash
which terraform
```

## Generate API Key

In order for terraform to be able to create and delete clusters on your behalf it must have a valid Symbiosis API Key.

API Keys can be created through the [Web UI](https://app.symbiosis.host/) under `auth & membership` → `api keys`.

## Creating a cluster

Create the following file and name it `main.tf`.

```hcl
terraform {
  required_providers {
    symbiosis = {
      source = "symbiosis-cloud/symbiosis"
      version = ">= 0.3"
    }
  }
}

variable "symbiosis_api_key" {}

provider "symbiosis" {
  api_key = var.symbiosis_api_key
}

resource "symbiosis_cluster" "staging" {
  name = "production-cluster"
  region = "germany-1"
}

resource "symbiosis_node_pool" "general" {
  cluster = symbiosis_cluster.staging.name
  node_type = "general-1"
  quantity = 2
}

resource "symbiosis_node_pool" "cpu" {
  cluster = symbiosis_cluster.staging.name
  node_type = "memory-3"
  quantity = 4
}
```

The manifest will provision one Kubernetes cluster with two node pools, one pool with two general purpose nodes and another pool with four memory optimized nodes. For a list of all node types see section on [Nodes](/about/nodes).

To create the cluster issue the following command:
```bash
terraform apply --var "symbiosis_api_key=<YOUR API KEY>"
```

Terraform will output a diff showing the new resources that will be created, make sure the diff aligns with your expectations before proceeding. If any future changes are made issuing the same above command will update the configuration.

The terraform state will be stored locally as no backend has been defined. It's considered best practice (and especially useful if you work with others) to define a remote backend, see [the terraform documentation](https://www.terraform.io/language/settings/backends).
