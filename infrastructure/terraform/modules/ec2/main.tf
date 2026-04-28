# ── Data ──────────────────────────────────────────────────────────────────────

data "aws_ami" "this" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = [var.ami_name_filter]
  }

  filter {
    name   = "architecture"
    values = [var.ami_architecture]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ── Security Group ────────────────────────────────────────────────────────────

resource "aws_security_group" "this" {
  name        = "${var.environment}-${var.name}-ec2-sg"
  description = "Security group for EC2 instance ${var.name} (${var.environment})"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      description = ingress.value.description
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-${var.name}-ec2-sg"
  }
}

# ── IAM Instance Profile ──────────────────────────────────────────────────────

resource "aws_iam_role" "this" {
  name = "${var.environment}-${var.name}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EC2AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "${var.environment}-${var.name}-ec2-role"
  }
}

resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "this" {
  name = "${var.environment}-${var.name}-ec2-profile"
  role = aws_iam_role.this.name
}

# ── Key Pair (optional) ───────────────────────────────────────────────────────

resource "aws_key_pair" "this" {
  count = var.public_key != "" ? 1 : 0

  key_name   = "${var.environment}-${var.name}-keypair"
  public_key = var.public_key

  tags = {
    Name = "${var.environment}-${var.name}-keypair"
  }
}

# ── EC2 Instance ──────────────────────────────────────────────────────────────

resource "aws_instance" "this" {
  ami                    = var.ami_id != "" ? var.ami_id : data.aws_ami.this.id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = concat([aws_security_group.this.id], var.additional_security_group_ids)
  iam_instance_profile   = aws_iam_instance_profile.this.name
  key_name               = var.public_key != "" ? aws_key_pair.this[0].key_name : null

  user_data                   = var.user_data != "" ? var.user_data : null
  user_data_replace_on_change = var.user_data_replace_on_change

  associate_public_ip_address = var.associate_public_ip_address

  root_block_device {
    volume_type           = var.root_volume_type
    volume_size           = var.root_volume_size
    delete_on_termination = true
    encrypted             = true

    tags = {
      Name = "${var.environment}-${var.name}-root-vol"
    }
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required" # IMDSv2 enforced
    http_put_response_hop_limit = 1
  }

  monitoring = var.detailed_monitoring

  tags = {
    Name = "${var.environment}-${var.name}"
  }

  lifecycle {
    ignore_changes = [ami] # prevent replacement on AMI updates; re-apply deliberately
  }
}

# ── Elastic IP (optional) ─────────────────────────────────────────────────────

resource "aws_eip" "this" {
  count = var.create_eip ? 1 : 0

  instance = aws_instance.this.id
  domain   = "vpc"

  tags = {
    Name = "${var.environment}-${var.name}-eip"
  }
}
