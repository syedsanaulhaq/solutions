# ── General ───────────────────────────────────────────────────────────────────

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region to deploy resources into."
  type        = string
  default     = "us-east-1"
}

# ── Networking ────────────────────────────────────────────────────────────────

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones to use."
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "public_subnets" {
  description = "CIDR blocks for public subnets (one per AZ)."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets (one per AZ)."
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

# ── Backend service ───────────────────────────────────────────────────────────

variable "backend_instance_type" {
  description = "ECS task CPU/memory class or EC2 instance type for the backend service."
  type        = string
  default     = "t3.small"
}

variable "backend_desired_count" {
  description = "Desired number of backend task instances."
  type        = number
  default     = 1
}

variable "backend_container_image" {
  description = "Docker image URI for the backend service (e.g. ECR URL with tag)."
  type        = string
}

variable "backend_container_port" {
  description = "Container port the backend service listens on."
  type        = number
  default     = 3000
}

# ── Database ──────────────────────────────────────────────────────────────────

variable "db_name" {
  description = "Name of the application database."
  type        = string
  default     = "hostingocean_dev"
}

variable "db_username" {
  description = "Master username for the database instance."
  type        = string
  default     = "hoceadmin"
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t3.micro"
}
