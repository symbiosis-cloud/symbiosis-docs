# Control Planes

With Symbiosis your Kubernetes control plane is fully managed and free of charge.

## High-availability (HA)

An unreachable control plane can be problematic for business critical applications that rely on an always accessible API server. For example, while running pods will continue to operate workloads configured with an Horizontal Pod Autoscaler will only scale when the control plane is accessible. It's therefore important to plan for how to keep your applications running if worst comes to worst.

At Symbiosis a cluster can be configured for high availability (HA). With HA your control plane will be managed by multiple replicas that can protect against downtime in case of single-node failures and disruptions.

HA can also increase responsiveness of your API-server by distributing your load. This is most noticeable for read-only requests since updates don't need to be consolidated among the replicas.

Control planes can be configured or upgraded to HA for $40/mo ($32/mo during our beta).

## Version upgrades

Symbiosis will automatically update the patch version of your Kubernetes cluster with non-breaking changes.

Symbiosis supports a set of three consecutive minor versions. If your cluster version falls behind our set of supported versions we will force an update. Keeping our users on recent and supported versions helps reduce exposure to security vulnerabilities and makes it easier for us to provide adequate support.

During an update, the control plane with controllers and data store are upgraded to the new version. Your workloads will not be impacted during the upgrade.

After control planes are upgraded Symbiosis will begin replacing your pools with nodes of the new version. Symbiosis will spawn additional nodes in order to avoid any downtime, this means that for a period after an upgrade your pools will contain more billable nodes than requested.
