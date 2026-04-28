# ── Networking ────────────────────────────────────────────────────────────────

output "vpc_id" {
  description = "ID of the VPC."
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets."
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "IDs of the private subnets."
  value       = module.vpc.private_subnet_ids
}

# ── Backend service ───────────────────────────────────────────────────────────

output "backend_service_url" {
  description = "URL of the backend service load balancer."
  value       = module.backend.service_url
}

output "backend_security_group_id" {
  description = "ID of the security group attached to the backend service."
  value       = module.backend.security_group_id
}

# ── Database ──────────────────────────────────────────────────────────────────

output "database_endpoint" {
  description = "Connection endpoint for the database instance."
  value       = module.database.endpoint
  sensitive   = true
}

output "database_name" {
  description = "Name of the application database."
  value       = module.database.db_name
}
