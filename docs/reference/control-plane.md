# Control Planes

With Symbiosis your Kubernetes control plane is fully managed and free of charge.

## Version upgrades

Symbiosis will automatically update the patch version of your Kubernetes cluster with non-breaking changes.

Symbiosis supports a set of three consecutive minor versions. If your cluster version falls behind our set of supported versions we will force an update. Keeping our users on recent and supported versions helps reduce exposure to security vulnerabilities and makes it easier for us to provide adequate support.

During an update, the control plane with controllers and data store is upgraded to the new version. Your workloads will not be impacted during the upgrade.

After control planes are upgraded Symbiosis will begin replacing your pools with nodes of the new version. Symbiosis will spawn additional nodes in order to avoid any downtime, this means that for a period after an upgrade your pools will contain more nodes than requested.
