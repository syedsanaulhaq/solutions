terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "hostingocean-tfstate"
    key            = "environments/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "hostingocean-tfstate-lock"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "HostingOcean"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# ── Networking ────────────────────────────────────────────────────────────────

module "vpc" {
  source = "../../modules/vpc"

  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  public_subnets     = var.public_subnets
  private_subnets    = var.private_subnets
}

# ── Compute ───────────────────────────────────────────────────────────────────

module "backend" {
  source = "../../modules/backend"

  environment    = var.environment
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnet_ids
  instance_type  = var.backend_instance_type
  desired_count  = var.backend_desired_count
  container_image = var.backend_container_image
  container_port  = var.backend_container_port
}

# ── Database ──────────────────────────────────────────────────────────────────

module "database" {
  source = "../../modules/database"

  environment      = var.environment
  vpc_id           = module.vpc.vpc_id
  subnet_ids       = module.vpc.private_subnet_ids
  db_name          = var.db_name
  db_username      = var.db_username
  db_instance_class = var.db_instance_class
  multi_az         = false
}
