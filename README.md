# katesCloset

############
## SERVER ##
############

These commands should be run from the local machine with the pem file for authentication

Command to connect to the server:

ssh -i ianFree.pem ec2-user@ec2-52-17-5-127.eu-west-1.compute.amazonaws.com


Command to upload a file to the server in the /home/ec2-user directory

scp -i ianFree.pem index.html ec2-user@ec2-52-17-5-127.eu-west-1.compute.amazonaws.com:outputfile


Command to upload a folder to the server in the /home/ec2-user directory

scp -i ianFree.pem -r closet-query ec2-user@ec2-52-17-5-127.eu-west-1.compute.amazonaws.com:kates-closet

########
## DB ##
########

DB Instance Identifier: ianAwsDatabases

user: 	icottam91
pw: 	Art3m1ss00

Database Name: closetData

Command to connect to the database:

sudo su -
mysql -uicottam91 -pArt3m1ss00 -hianawsdatabases.ci9vioqnifm9.eu-west-1.rds.amazonaws.com

OLD source value: 				90.212.219.137/32
VPN security group: 			sg-49e1ba2c controll the access to the db from the EC2 Instance

Guide to Command line tools: 	https://dev.mysql.com/doc/refman/5.0/en/creating-database.html

##########
## TODO ##
##########

Need to add DB entries to the tables using the MYSQL command line tools on EC2 server
Need to ammend Query.class.php code to connect to my database RDS instance
Need to sort out security group
