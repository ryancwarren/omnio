


resource "aws_eip" "nat_eip" {
  count = 2
  domain = "vpc"
}

resource "aws_nat_gateway" "omnio_regional_nat_gtw" {
  count         = 2
  allocation_id = aws_eip.nat_eip[count.index].id
  subnet_id     = aws_subnet.private_subnets[count.index].id

  tags = {
    Name = "${var.root}/natgtw/${count.index}"
  }
}

resource "aws_route_table" "public_routetable" {
  vpc_id = aws_vpc.omnio_regional_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.omnio_regional_vpc_igw.id
  }

  tags = {
    Name = "${var.root}/vpc/${aws_vpc.omnio_regional_vpc.id}/rt/1"
  }
}

resource "aws_route_table" "private_routetable" {
  count  = 2
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gtw[count.index].id
  }

  tags = {
    Name = "${var.root}/${aws_vpc.omnio_regional_vpc.id}/rt/${count.index + 1 + 1}"
  }
}

resource "aws_route_table_association" "public_rt_associations" {
  count          = length(aws_subnet.public_subnets)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_routetable.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private_subnets)
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private_routetable[count.index].id
}

resource "aws_network_acl" "omnio_regional_nacl" {
  vpc_id = aws_vpc.omnio_regional_vpc.id
  subnet_ids = concat(
    aws_subnet.public_subnets.*.id,
    aws_subnet.private_subnets.*.id
  )

  tags = {
    Name = "${var.root}/nacl/1"
  }
}

resource "aws_network_acl_rule" "allow_inbound_from_specific_ip" {
  network_acl_id = aws_network_acl.omnio_regional_nacl.id
  rule_number    = 100
  egress         = false
  protocol       = "tcp"
  rule_action    = "allow"
  cidr_block     = "64.66.210.14/32"
  from_port      = 0
  to_port        = 65535
}

# For outbound traffic from 64.66.210.14, you'd need to set egress to true and adjust the source to the VPC's CIDR
resource "aws_network_acl_rule" "allow_outbound_to_specific_ip" {
  network_acl_id = aws_network_acl.omnio_regional_nacl.id
  rule_number    = 110
  egress         = true
  protocol       = "tcp"
  rule_action    = "allow"
  cidr_block     = "64.66.210.14/32"
  from_port      = 0
  to_port        = 65535
}

# Don't forget to add a deny all rule at the end to ensure no other traffic is allowed
resource "aws_network_acl_rule" "deny_all_inbound" {
  network_acl_id = aws_network_acl.omnio_regional_nacl.id
  rule_number    = 32766
  egress         = false
  protocol       = "-1" # All protocols
  rule_action    = "deny"
  cidr_block     = "0.0.0.0/0"
}

resource "aws_network_acl_rule" "deny_all_outbound" {
  network_acl_id = aws_network_acl.omnio_regional_nacl.id
  rule_number    = 100
  egress         = true
  protocol       = "-1" # All protocols
  rule_action    = "deny"
  cidr_block     = "0.0.0.0/0"
}




# Create an SSH key pair
resource "aws_key_pair" "ec2_ssh_key" {
  key_name   = "ec2-ssh-key"
  public_key = tls_private_key.ec2_key.public_key_openssh
}

# Generate a new TLS private key
resource "tls_private_key" "ec2_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Save the private key to a local file
resource "local_file" "private_key" {
  content         = tls_private_key.ec2_key.private_key_pem
  filename        = pathexpand("~/.ssh/ec2-ssh-key.pem")
  file_permission = "0600"
}

# Output the key name for reference
output "key_name" {
  value = aws_key_pair.ec2_ssh_key.key_name
}

# Data source for the latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"
  vpc_id      = aws_vpc.omnio_regional_vpc.id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["64.66.210.14/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["64.66.210.14/32"]
  }

  tags = {
    Name = "allow_http_sg"
  }
}

# EC2 instance with user data to install and run NGINX
resource "aws_instance" "nginx_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro" # Free-tier eligible
  subnet_id     = aws_subnet.public_subnets[0].id
  key_name      = aws_key_pair.ec2_ssh_key.key_name
  vpc_security_group_ids = [aws_security_group.allow_http.id]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF

  tags = {
    Name = "nginx-on-ubuntu"
  }


}

# Output the public IP address of the instance
output "instance_public_ip" {
  value = aws_instance.nginx_server.public_ip
}