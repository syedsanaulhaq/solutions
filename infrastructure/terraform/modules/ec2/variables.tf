# ── General ───────────────────────────────────────────────────────────────────

variable "environment" {
  description = "Deployment environment name (e.g. dev, staging, prod)."
  type        = string
}

variable "name" {
  description = "Logical name for this instance; used to compose resource names and tags."
  type        = string
}

# ── Networking ────────────────────────────────────────────────────────────────

variable "vpc_id" {
  description = "ID of the VPC in which to launch the instance."
  type        = string
}

variable "subnet_id" {
  description = "ID of the subnet (public or private) in which to launch the instance."
  type        = string
}

variable "associate_public_ip_address" {
  description = "Whether to assign a public IP address. Set true only for public subnets."
  type        = bool
  default     = false
}

variable "create_eip" {
  description = "Allocate and attach an Elastic IP to the instance."
  type        = bool
  default     = false
}

variable "ingress_rules" {
  description = "List of ingress rule objects to add to the instance security group."
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = []
}

variable "additional_security_group_ids" {
  description = "Extra security group IDs to attach alongside the module-managed one."
  type        = list(string)
  default     = []
}

# ── AMI ───────────────────────────────────────────────────────────────────────

variable "ami_id" {
  description = "Explicit AMI ID. When empty the module resolves the latest AMI via ami_name_filter."
  type        = string
  default     = ""
}

variable "ami_name_filter" {
  description = "Glob pattern used to find the latest AMI when ami_id is not provided."
  type        = string
  default     = "al2023-ami-2023.*-kernel-*-x86_64"
}

variable "ami_architecture" {
  description = "AMI architecture filter (x86_64 or arm64)."
  type        = string
  default     = "x86_64"

  validation {
    condition     = contains(["x86_64", "arm64"], var.ami_architecture)
    error_message = "ami_architecture must be \"x86_64\" or \"arm64\"."
  }
}

# ── Compute ───────────────────────────────────────────────────────────────────

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "t3.micro"
}

variable "detailed_monitoring" {
  description = "Enable detailed (1-minute) CloudWatch monitoring."
  type        = bool
  default     = false
}

# ── Storage ───────────────────────────────────────────────────────────────────

variable "root_volume_type" {
  description = "EBS volume type for the root block device."
  type        = string
  default     = "gp3"

  validation {
    condition     = contains(["gp2", "gp3", "io1", "io2"], var.root_volume_type)
    error_message = "root_volume_type must be one of gp2, gp3, io1, or io2."
  }
}

variable "root_volume_size" {
  description = "Root EBS volume size in GiB."
  type        = number
  default     = 20
}

# ── Access ────────────────────────────────────────────────────────────────────

variable "public_key" {
  description = "SSH public key material. Leave empty to skip key-pair creation (use SSM Session Manager instead)."
  type        = string
  default     = ""
  sensitive   = true
}

variable "user_data" {
  description = "Cloud-init / user data script (plain text or base64). Leave empty for none."
  type        = string
  default     = ""
}

variable "user_data_replace_on_change" {
  description = "Force instance replacement when user_data changes."
  type        = bool
  default     = false
}
