output "instance_id" {
  description = "ID of the EC2 instance."
  value       = aws_instance.this.id
}

output "instance_arn" {
  description = "ARN of the EC2 instance."
  value       = aws_instance.this.arn
}

output "private_ip" {
  description = "Private IPv4 address of the instance."
  value       = aws_instance.this.private_ip
}

output "public_ip" {
  description = "Public IPv4 address of the instance (empty string if no public IP was assigned)."
  value       = var.create_eip ? aws_eip.this[0].public_ip : aws_instance.this.public_ip
}

output "security_group_id" {
  description = "ID of the security group created for this instance."
  value       = aws_security_group.this.id
}

output "iam_role_arn" {
  description = "ARN of the IAM role attached to the instance profile."
  value       = aws_iam_role.this.arn
}

output "iam_instance_profile_name" {
  description = "Name of the IAM instance profile."
  value       = aws_iam_instance_profile.this.name
}

output "ami_id" {
  description = "AMI ID used to launch the instance (resolved or provided)."
  value       = aws_instance.this.ami
}
